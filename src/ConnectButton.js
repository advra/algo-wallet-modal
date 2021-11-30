import { WalletSelector } from ".";

const ConnectButton = () => {
  

  const returnWallet = async (data) => {
    if (!!data) {
      console.log(data.connector.check());
      console.log(await data.connector.connect());
      console.log(data.connector.provider);
    }
  };

  const Template = (args) => (
    <div>
        <WalletSelector returnWallet={returnWallet} />
    </div>
  );

    return (  
        <div>
        <Template />
        </div>
    );
}
 
export default ConnectButton;