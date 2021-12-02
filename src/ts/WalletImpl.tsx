
import AlgoSignerWallet from '../js/wallets/connectors/AlgoSigner';
import MyAlgoConnectWallet from '../js/wallets/connectors/WalletConnect';
import InsecureWallet from './wallets/insecure'
import WC from './wallets/walletconnect'
import { PermissionResult, PermissionCallback, Wallet, SignedTxn } from './wallets/wallet'
import { Transaction } from 'algosdk'

export const allowedWallets = {
  'wallet-connect': WC,
  'algo-signer': AlgoSignerWallet,
  'my-algo-connect': MyAlgoConnectWallet,
  // 'insecure-wallet': InsecureWallet,
}

const walletPreferenceKey = 'wallet-preference'
const acctListKey = 'acct-list'
const acctPreferenceKey = 'acct-preference'
const mnemonicKey = 'mnemonic'

export class SessionWallet {
  wallet: Wallet
  wname: string
  network: string
  permissionCallback?: PermissionCallback

  constructor(network: string, permissionCallback?: PermissionCallback, wname?: string) {
    if (wname) this.setWalletPreference(wname)

    this.network = network

    this.wname = this.walletPreference()

    if (permissionCallback) this.permissionCallback = permissionCallback

    if (!(this.wname in allowedWallets)) return

    this.wallet = new allowedWallets[this.wname](network)
    this.wallet.permissionCallback = this.permissionCallback
    this.wallet.accounts = this.accountList()
    this.wallet.defaultAccount = this.accountIndex()
  }

  async connect(): Promise<boolean> {
    if (!this.wallet) {
      return false;
    }

    switch (this.wname) {
      case 'insecure-wallet':
        const storedMnemonic = this.mnemonic()
        const mnemonic = storedMnemonic ? storedMnemonic : prompt('Paste your mnemonic space delimited (DO NOT USE WITH MAINNET ACCOUNTS)');
        if (!mnemonic) {
          return false;
        }
        if (await this.wallet.connect(mnemonic)) {
          this.setMnemonic(mnemonic)
          this.setAccountList(this.wallet.accounts)
          this.wallet.defaultAccount = this.accountIndex()
          return true;
        }
      case 'wallet-connect':
        await this.wallet.connect((acctList) => {
          this.setAccountList(acctList);
          this.wallet.defaultAccount = this.accountIndex();
        });
        return true;
      default:
        if (await this.wallet.connect()) {
          this.setAccountList(this.wallet.accounts);
          this.wallet.defaultAccount = this.accountIndex();
          return true;
        } else {
          // Fail
          this.disconnect();
          return false;
        }
    }
  };

  async signTxn(txns: Transaction[]): Promise<SignedTxn[]> {
    if (!this.connected() && !await this.connect()) {
      return [];
    }
    return this.wallet.signTxn(txns);
  }

  connected(): boolean { return this.wallet !== undefined && this.wallet.isConnected(); };
  setAccountList(accts: string[]): void { sessionStorage.setItem(acctListKey, JSON.stringify(accts)); };
  setAccountIndex(idx: number): void { this.wallet.defaultAccount = idx; sessionStorage.setItem(acctPreferenceKey, idx.toString()) };
  setWalletPreference(wname: string): void { this.wname = wname; sessionStorage.setItem(walletPreferenceKey, wname) };
  setMnemonic(m: string): void { sessionStorage.setItem(mnemonicKey, m) };

  accountList(): string[] {
    const accts = sessionStorage.getItem(acctListKey);
    return accts === '' || accts === null ? [] : JSON.parse(accts);
  }

  accountIndex(): number {
    const idx = sessionStorage.getItem(acctPreferenceKey);
    return idx === null || idx === '' ? 0 : parseInt(idx, 10);
  }

  walletPreference(): string {
    const wp = sessionStorage.getItem(walletPreferenceKey);
    return wp === null ? '' : wp;
  }

  mnemonic(): string {
    const mn = sessionStorage.getItem(mnemonicKey);
    return mn === null ? '' : mn;
  }

  disconnect(): void {
    if (this.wallet !== undefined) {
      this.wallet.disconnect();
    }
    sessionStorage.setItem(walletPreferenceKey, '');
    sessionStorage.setItem(acctPreferenceKey, '');
    sessionStorage.setItem(acctListKey, '');
    sessionStorage.setItem(mnemonicKey, '');
  }

  getDefaultAccount(): string {
    if (!this.connected()) {
      return '';
    }
    return this.wallet.getDefaultAccount();
  }
}