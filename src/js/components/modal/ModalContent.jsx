import { Button } from 'react-bootstrap'

import { WalletButton } from '../walletButton'
import { useWallet } from '../context/ProvideWallet'

const ModalContent = ({ closeModal }) => {
  const { setWallet, getWallets } = useWallet();
  const onClick = (walletInfo) => {
    setWallet(walletInfo);
    closeModal(walletInfo);
  };

  return (
    <>
      <Dialog.Title as='h3' className='text-lg font-medium'>
        Select Wallet
      </Dialog.Title>
      <div className='grid grid-cols-1 gap- mt-4'>
        {getWallets().map(wallet =>
          !!wallet ? (
            <WalletButton key={wallet.id} info={wallet} onClick={() => onClick(wallet)} />
          ) : null
        )}
      </div>
      <div className='hidden'>
        <Button type='button' onClick={closeModal}>
          Cancel
        </Button>
      </div>
    </>
  );
}

export default ModalContent;