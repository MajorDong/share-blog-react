import { http } from '../requset';
import { message } from 'antd';
import { AxiosResponse } from 'axios';

export enum AuthUrl {
	register = '/auth/register',
	login = '/auth/login',
	logout = '/auth/logout',
	isLogined = '/auth'
}

export interface User {
	username: string,
	password: string,
}

export default {
	register(user: User) {
		return new Promise((resolve, reject) => {
			http.post(AuthUrl.register, user).then((res: AxiosResponse) => {
				if (res.data.status === 'ok') {
					message.success(res.data.msg);
					resolve(res.data);
				}
			}).catch((err) => {
				message.error('注册失败');
				reject(err.data);
			})
		})
	},

	login(user: User) {
		return new Promise((resolve, reject) => {
			http.post(AuthUrl.login, user).then((res: AxiosResponse) => {
				if (res.data.status === 'ok') {
					message.success(res.data.msg);
					resolve(res.data)
				}
			}).catch((err) => {
				message.error(err.data.msg)
				reject(err.data)
			})
		})
	},

	logout() {
		return http.get(AuthUrl.logout).then((res) => {
			if (res.data.status === 'fail') {
				message.warn(res.data.msg)
				return res.data
			}
		}).catch((err) => {
			message.error(err.data.msg)
			return err.data
		})
	},

	isLogined() {
		return new Promise((resolve, reject) => {
			http.get(AuthUrl.isLogined).then((res) => {
				if (res.data.status === 'ok') {
					resolve(res.data)
				}
			}).catch((err) => {
				reject(err.data)
			})
		})
	}

}