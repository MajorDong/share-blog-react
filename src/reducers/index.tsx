import { UserInfo } from '../types/user-info'

export interface AuthStoreState {
	user: UserInfo,
	isLogin: boolean
}

const defaultState = {
	user: {} as UserInfo,
	isLogin: true,
}

function auth(state = defaultState, action: any): AuthStoreState {
	switch (action.type) {
		case 'SET_USER':
			return {
				...state,
				user: action.payload,
			}
		case 'SET_LOGIN':
			return {
				...state,
				isLogin: action.payload,
			}
		default:
			return state
	}
}

export default auth