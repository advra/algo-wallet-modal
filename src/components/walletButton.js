import React from 'react'
import { Button, Image } from 'react-bootstrap'

export const WalletButton = ({ info, onClick }) => {
  return (
    <Button onClick={onClick} className="w-50 h-50 xcard flex flex-col justify-center bg-white rounded-md items-center ">
      <Image className="w-50 h-50" src={info.logo}/>
      <p className="text-lg font-bold text-black">
        {info.name}
      </p>
    </Button>
  );
}

export default WalletButton;