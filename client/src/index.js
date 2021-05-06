import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import App2 from './App2';
import registerServiceWorker from './registerServiceWorker';
const switchApp = () => {
    console.log("switched apps")
    ReactDOM.render(<App2 props={switchApp2}/>, document.getElementById('root'));
    registerServiceWorker();
}
const switchApp2 = () => {
    console.log("switched apps")
    ReactDOM.render(<App props={switchApp}/>, document.getElementById('root'));
    registerServiceWorker();
}
ReactDOM.render(<App props={switchApp}/>, document.getElementById('root'));
registerServiceWorker();

