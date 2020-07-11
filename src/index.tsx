import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {createStore, applyMiddleware} from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import auth from '../src/reducers/index'

const stroe = createStore(
	auth,
	applyMiddleware(thunk)
)

ReactDOM.render(
	<Provider store={stroe}>
		<App />
	</Provider>
  ,
  document.getElementById('root')
);



