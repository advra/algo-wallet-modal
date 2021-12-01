import { WalletSelector } from ".";

const ConnectButton = () => {
  
  const returnWallet = async (data) => {
    if (!!data) {
      console.log(data.connector.check());
      console.log(await data.connector.connect());
      console.log(data.connector.provider);
    }
  };

    return (  
      <div>
       <WalletSelector returnWallet={returnWallet} />
      </div>
    );
}
 
export default ConnectButton;