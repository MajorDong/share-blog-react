import httpAuth from '../service/auth/auth';
import { UserInfo } from '../types/user-info';
import { User } from '../service/auth/auth'


const setUser = (payload: UserInfo) => {
	return {
		type: 'SET_USER',
		payload,
	}
}

const setLogin = (payload: boolean) => {
	return {
		type: 'SET_LOGIN',
		payload,
	}
}

export const fetchLogin = (user: User) => (dispatch: any) => {
	return httpAuth.login(user).then( (res: any) => {
		if(res.status === 'ok'){
			dispatch(setLogin(true));
			dispatch(setUser(res.data));
		}
	})
}

export const fetchRegister = (user: User) => (dispatch: any) => {
	 return httpAuth.register(user).then((res: any) => {
		if(res.status === 'ok'){
			dispatch(setLogin(true));
			dispatch(setUser(res));
		}
	})
}

export const fetchLogout = () => (dispatch: any) => {
	httpAuth.logout().then((res) => {
		if(res.status === 'ok'){
			dispatch(setLogin(false));
			dispatch(setUser({ } as UserInfo))
		}
	})
}

export const fetchCheckIsLogined = () => (dispatch: any) => {
	httpAuth.isLogined().then((res: any) => {
		if(res.isLogin === true){
			dispatch(setLogin(res.isLogin));
			dispatch(setUser(res.data))
		}
	})
}

