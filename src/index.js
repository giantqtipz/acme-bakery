import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './store';
/* GENERAL COMMENTS FOR APP
- Recipes not rendering, missing some functionality.
- General code cleanliness comment across all files. Remove commented out code that is no longer being used.
*/
const root = document.querySelector('#root');
render(<Provider store={store}><App /></Provider>, root);



