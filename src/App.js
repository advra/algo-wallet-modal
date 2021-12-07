import { Navbar, Container } from 'react-bootstrap';
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
        <Container>
        <Navbar.Brand href="#home">Algo Wallet</Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <ConnectButton/>
        </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default App;
