import * as React from 'react';
import { render } from 'react-dom';
import Dashboard from './scenes/Dashboard';

const container = document.getElementById('container');

if (container) {
  render(
    <React.StrictMode>
      <Dashboard />
    </React.StrictMode>,
    container,
  );
}
