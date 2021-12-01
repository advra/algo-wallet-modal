import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';

import { ProvideWallet, useWallet } from '../context/ProvideWallet';
import { Button, Modal } from 'react-bootstrap';
import { WalletButton } from './walletButton'

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

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleOpen = () => setShow(true);
  const { setWallet, getWallets } = useWallet();
  
  const onClick = (walletInfo) => {
    setWallet(walletInfo);
    handleClose(walletInfo);
  }

  return (
    <>
      <div>
        <Button variant="primary" onClick={handleOpen}>
          Connect wallet
        </Button>
      </div>
      
      <Modal show={show} onHide={handleClose}>

        <Modal.Header closeButton>
          Select Wallet
        </Modal.Header>

        {/* ToDo: onClick is broken. Doesnt seem to route the provider link*/}
        <Modal.Body>
        <div className="grid grid-cols-1 mt-4">
          {getWallets().map(wallet =>
            !!wallet ? (
              <WalletButton key={wallet.id} info={wallet} onClick={() => onClick(wallet)} />
            ) : null
          )}
        </div>
        </Modal.Body>

      </Modal>
    </>
  );
};

WalletSelector.propTypes = {
  returnWallet: PropTypes.func,
  wallets: PropTypes.array
};