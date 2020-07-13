import { useState, useEffect } from 'react';
import httpAuth from '../service/auth/auth';

export function useAuthStatus() {
	const [isLogin ,setIsLogin] = useState(null);
	useEffect(() => {
		httpAuth.isLogined().then((res:any) => {
			setIsLogin(res.isLogin);
		})
	})

	return isLogin;
}