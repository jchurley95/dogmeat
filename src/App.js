import React, { Component } from 'react';
import styled from 'styled-components';
import Gameboard from './components/Gameboard/Gameboard';

const AppWrapper = styled.div`
  display: flex;
  justify-content: column;
`

class App extends Component {
  constructor() {
    super();

    this.state = {

    }
  }

  render() {
    return (
      <AppWrapper>
        <Gameboard 

        />
      </AppWrapper>
    );
  }
}

export default App;
