import React from 'react';
import Frame from './Frame';

class App extends React.Component {
  render() {
    if (this.props.model === 'liliya') return <Frame
      model={'liliya'}
      motions={['wavefile']}
    />;
    if (this.props.model === 'rozaliya') return <Frame
      model={'rozaliya'}
      motions={['wavefile']}
    />;
    if (this.props.model === 'seele') return <Frame
      model={'seele'}
      motions={['senbonzakura']}
    />;
    return <Frame
      model={'wendy'}
      motions={['sweetmagic-lip', 'sweetmagic-left']}
      modelX={10}
    />;
  }
}

export default App;
