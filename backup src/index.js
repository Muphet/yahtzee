import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import App from './containers/container_app';
import reducers from './reducers';

// This renders the React App (wrapped in Provider to utilize Redux)
ReactDOM.render(
    <Provider store={createStore(reducers)}>
        <App />
    </Provider>
    // This argument determines what HTML element is used to render the React App
    , document.querySelector('#root'));