import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import './index.css';
import './yorha.css';

const params = new URLSearchParams(window.location.search);
ReactDOM.render(<App model={params.get('model')}/>, document.getElementById('root'));
