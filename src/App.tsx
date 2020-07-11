import React, { useState, useEffect } from 'react';
import blog from '../src/service/blog/blog';
import './App.less';

function App() {
	const [count, setCount] = useState(0)
	useEffect(()=>{
		blog.getDetail('20').then( res => {
			console.log(res)
		})
	}, [])
	return (
		<div className="App">
			<div>share-blog{count}</div>
			<button
				onClick={() => {
					setCount(() => {
						if (count % 2 === 0) {
							return count + 3;
						}
						return count + 1;
					}
					)
				}}
			>
				+1
			 </button>
		</div>
	);
}

export default App;
