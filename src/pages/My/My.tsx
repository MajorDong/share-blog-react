import React from 'react';
import './My.less';
import {}

export interface MyProps {
	
}
 
const My: React.FC<MyProps> = () => {

	return ( 
		<>
			<div className="my">
				<section className="my-info">
					<Avatar size="large" src={} />
					<h3>{}</h3>
				</section>
			</div>
		</>
	 );
}
 
export default My;