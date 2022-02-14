import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
//import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import 'antd/dist/antd.css';
import { applyMiddleware, createStore } from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import Reducer from './_reducers'


const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore)
//원래 store는 객체밖에못받지만 이렇게 두개더해서 만듬으로써 두 형식다 받을 수 있음.
ReactDOM.render(
  <Provider store={createStoreWithMiddleware(Reducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__()
    )}
  >
    <App />
  </Provider>

  , document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals(); <-- ServiceWorker.unregister();의 신버전
