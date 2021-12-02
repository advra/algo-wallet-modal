import React from 'react'
import { Button } from 'react-bootstrap'

export const WalletButton = ({ info, onClick }) => {
  return (
    <Button onClick={onClick} className='xcard bg-white rounded-md items-center'>
      <img src={info.logo}/>
      <p className='text-lg font-bold'>
        {info.name}
      </p>
    </Button>
  );
}

export default WalletButton;