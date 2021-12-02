import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

import { MyModal } from './MyModal'
import { useWallet } from '../context/ProvideWallet';

export const SelectorContent = ({ returnWallet, validWallets }) => {
  let [isOpen, setIsOpen] = useState(false)
  const { setValidWallets } = useWallet();

  useEffect(() => {
    setValidWallets(validWallets);
  }, [validWallets]);

  const closeModal = (walletInfo) => {
    setIsOpen(false)
    returnWallet(walletInfo)
  }

  const openModal = () => {
    setIsOpen(true)
  }

  return (
    <>
      <div className='flex items-center justify-center'>
        <Button variant='primary' onClick={openModal}>
          Connect wallet
        </Button>
      </div>
      <MyModal isOpen={isOpen} closeModal={closeModal} />
    </>
  );
};

WalletSelector.propTypes = {
  returnWallet: PropTypes.func,
  wallets: PropTypes.array
};