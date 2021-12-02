import React, { createContext, useContext } from 'react';
import { useProvideWallet } from './UseProvideWallet';

const provideContext = createContext();

export const ProvideWallet = ({ children }) => (
  <provideContext.Provider value={useProvideWallet()}>
  {children}
</provideContext.Provider>
);

export default () => useContext(provideContext);