import React from 'react'
import { Button } from 'react-bootstrap'
import '../styles/theme.css'

export const WalletButton = ({ info, onClick }) => {
  return (
    <Button className="walletButton"
      onClick={onClick} className="xcard bg-white rounded-md items-center rounded-md shadow hover:shadow-md focus:outline-none">
      <img className="walletImg" src={info.logo}/>
      <p className="text-lg font-bold text-black">
        {info.name}
      </p>
    </Button>
  );
}

export default WalletButton;