import { useState } from 'react';
import { injected, providers, connectors } from '../../wallets';

const UseProvideWallet = () => {
  const [wallet, _setWallet] = useState(null);
  const [validWallets, _setValidWallets] = useState([]);

  const allWallets = Object.values({ ...providers, ...injected}).map((walletInfo) => ({
    ...walletInfo,
    connector: connectors[walletInfo.id](),
  }));

  const setWallet = (walletInfo) => {
    _setWallet(walletInfo);
  };

  const setValidWallets = (validWallets) => {
    _setValidWallets(validWallets);
  };

  const getWallets = () => {
    const filteredWallets = allWallets.filter(wallet => (
      validWallets.includes(wallet.id)
    ));
    if (filteredWallets.length === 0) return allWallets;
    return filteredWallets;
  };

  return {
    wallet,
    setWallet,
    getWallets,
    setValidWallets,
  };
}

export default UseProvideWallet;