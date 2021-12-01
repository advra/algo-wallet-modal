import React from 'react'
import { Button } from 'react-bootstrap'

export const WalletButton = ({ info, onClick }) => {
  return (
    <Button
      onClick={onClick} className="xcard bg-white rounded-md items-center"
      // className="xcard bg-white flex flex-col p-2 justify-center items-center rounded-md shadow hover:shadow-md focus:outline-none"
    >
      <img src={info.logo}/>
      <p className="text-lg font-bold">
        {info.name}
      </p>
    </Button>
  );
}

export default WalletButton;