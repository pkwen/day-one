import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
<<<<<<< HEAD
  ReactDOM.unmountComponentAtNode(div);
=======
>>>>>>> 179f48403bbf45521889130b9f8f77ec19450cb0
});
