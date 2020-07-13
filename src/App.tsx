import React from 'react';
import { HashRouter } from 'react-router-dom';
import RouteIndex from './router/index';
import BlogFooter from './components/BlogFooter/blog-footer';
import BlogHeader from './components/BlogHeader/blog-header';
import './App.less';

function App() {

	return (
		<div className="App">
			<HashRouter>
				<BlogHeader />
				<RouteIndex />
				<BlogFooter />
			</HashRouter>
		</div>
	);
}

export default App;
