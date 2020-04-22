import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {flushPromises} from '../tests/helpers.ts';

it('renders without crashing', async () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  await flushPromises();
  ReactDOM.unmountComponentAtNode(div);
});
