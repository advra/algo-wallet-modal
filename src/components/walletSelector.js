import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';

import { MyModal } from './MyModal';
import { ProvideWallet, useWallet } from '../context/ProvideWallet';
import { Button } from 'react-bootstrap';

/**
 * Primary UI component for user interaction
 */
export const WalletSelector = ({ returnWallet, wallets = [] }) => {
  return (
    <div>
      <ProvideWallet>
        <SelectorContent returnWallet={returnWallet} validWallets={wallets} />
      </ProvideWallet>
    </div>
  );
};

const SelectorContent = ({ returnWallet, validWallets }) => {
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
      <div className="flex items-center justify-center">
        <Button variant="primary" onClick={openModal}>
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