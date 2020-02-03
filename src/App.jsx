import React from 'react';
import styled from 'styled-components';
import onepiece from './images/onepiece.jpg';
import './test.css';

const Button = styled.button`
  height: 40px;
  margin: 20px;
  font-size: 20px;
`;

const Img = styled.img`
  display: block;
  margin: 20px;
  width: 300px;
  height: 300px;
`;

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      Text: null
    };
  }

  loadComponent = () => {
    import('./Title.js').then(Text => {
      this.setState({
        Text: Text.default
      });
    });
  };

  render() {
    const { Text } = this.state;
    return (
      <div>
        {Text ? <Text /> : null}
        <Button onClick={this.loadComponent}>Dynamic import</Button>
        <Img src={onepiece} alt="onepiece" />
      </div>
    );
  }
}
export default App;
