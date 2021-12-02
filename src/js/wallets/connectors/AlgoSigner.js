const AlgoSigner = undefined;

const checkConnection = () => typeof AlgoSigner !== 'undefined';
  
const ConnectToAlgoSigner = () => {
    if (typeof window === 'undefined') {
        return {
        provider: AlgoSigner,
        connect: AlgoSigner.connect,
        check: checkConnection,
        };
    }
};

export default ConnectToAlgoSigner;
