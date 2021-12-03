import React, { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'

import { WalletButton } from './walletButton'

import { useWallet } from '../context/ProvideWallet'
import { Button } from 'react-bootstrap'

export const MyModal = ({ isOpen, closeModal }) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="bg-gray-250 bg-opacity-25 fixed inset-0 z-10 overflow-y-auto"
        onClose={closeModal}
      >
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="bg-gray-100 inline-block w-full max-w-lg p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white border shadow-xl rounded-2xl">
              <ModalContent closeModal={closeModal} />
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}

const ModalContent = ({ closeModal }) => {
  const { setWallet, getWallets } = useWallet();
  const onClick = (walletInfo) => {
    setWallet(walletInfo);
    closeModal(walletInfo);
  }
  return (
    <>
      <Dialog.Title as="h3" className="text-lg font-medium">
        Select Wallet
      </Dialog.Title>

      <div className="grid grid-cols-1 gap- mt-4">
        {getWallets().map(wallet =>
          !!wallet ? (
            <WalletButton key={wallet.id} info={wallet} onClick={() => onClick(wallet)} />
          ) : null
        )}
      </div>

      <div className="hidden">
        <Button type="button" onClick={closeModal}>
          Cancel
        </Button>
      </div>
    </>
  );
}

export default MyModal;