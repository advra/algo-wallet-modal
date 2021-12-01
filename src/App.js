import logo from './logo.svg';
import './App.css';
import { Button, Row, Col, Navbar, Container} from 'react-bootstrap';

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
    <Navbar>
      <Navbar.Brand href="#home">Algorand Wallet Selector Example</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
      <ConnectButton />
      </Navbar.Collapse>
    </Navbar>
    </div>
  );
}

export default App;
