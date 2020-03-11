import React from 'react';
import { Container } from 'react-bootstrap';
import Rushing from './components/Rushing';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
      <Container fluid={true} className="mainContainer">
          <Rushing/>
      </Container>
  );
}

export default App;
