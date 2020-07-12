import React from 'react';
import BlogFooter from './components/BlogFooter/blog-footer';
import BlogHeader from './components/BlogHeader/blog-header';
import './App.less';

function App() {

	return (
		<div className="App">
			<BlogHeader />
			<BlogFooter />
		</div>
	);
}

export default App;
