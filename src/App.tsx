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
				<div className="header"><BlogHeader /></div>
				<main className='main'><RouteIndex /></main>
				<div className="footer"><BlogFooter /></div>
			</HashRouter>
		</div>
	);
}

export default App;
