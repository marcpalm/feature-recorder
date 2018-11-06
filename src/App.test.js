import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Api } from './api';

it('renders without crashing', () => {
  const div = document.createElement('div');
  window.api = window.api || Api
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
