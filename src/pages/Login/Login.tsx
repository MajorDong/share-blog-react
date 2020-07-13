import  React, { useEffect } from 'react';
import { message } from 'antd';

export interface LoginProps {
	
}
 
const Login: React.FC<LoginProps> = (props) => {
	useEffect(() => {
		message.info('请登录账号')
	},[])

	return ( 
		<>
			
		</>
	 );
}
 
export default Login;