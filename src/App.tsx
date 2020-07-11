import React, { useState } from 'react';
import './App.less';

function App() {
	const [count, setCount] = useState(0)
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
