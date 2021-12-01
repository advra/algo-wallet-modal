import logo from './logo.svg';
import './App.css';
import { Button, Row, Col } from 'react-bootstrap';

import ConnectButton from './ConnectButton';

<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
  integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
  crossorigin="anonymous"
/>

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ConnectButton />
      </header>
    </div>
  );
}

export default App;
