import { WalletSelector } from ".";

const ConnectButton = () => {
  
  const returnWallet = async (data) => {
    if (!!data) {
      console.log(data.connector.check());
      console.log(await data.connector.connect());
      console.log(data.connector.provider);
      console.log("failure");
    } else{
      console.log("nothing");
    }
  };

    return (  
        <>
          {/* <WalletSelector returnWallet={returnWallet} /> */}
          <Button variant="primary" onClick={openModal}>
            Connect wallet
          </Button>
          <MyModal isOpen={isOpen} closeModal={closeModal} />
        </>
    );
}
 
export default ConnectButton;