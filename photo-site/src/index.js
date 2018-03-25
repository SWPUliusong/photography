import React from 'react';
import ReactDOM from 'react-dom';
import "./index.css"
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { userStore } from "./store"
// 验证是否过期
userStore
    .checkLogin()
    .then(() => {
        ReactDOM.render(<App />, document.getElementById('root'));
        registerServiceWorker();
    })
