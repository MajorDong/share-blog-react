import React, { Suspense, lazy } from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import { useAuthStatus } from '../hooks/useAuthStatus';


const Index = lazy(() => import('../pages/Index/Index'));
const Login = lazy(() => import('../pages/Login/Login'));
const Register = lazy(() => import('../pages/Register/Register'));
const Detail = lazy(() => import('../pages/Detail/Detail'));
const Edit = lazy(() => import('../pages/Edit/Edit'));
const Create = lazy(() => import('../pages/Create/Create'));
const My = lazy(() => import('../pages/My/My'));
const User = lazy(() => import('../pages/User/User'));

export default function RouteIndex() {
	const isLogin = useAuthStatus()
	
	return (
		<Switch>
			<Suspense fallback={<div>Loading</div>}>
				<Route exact path='/'>
					<Index />
				</Route>
				<Route path='/register'>
					<Register />
				</Route>
				<Route path='/login'>
					<Login /> 
				</Route>
				<Route path='/detail/:blogId'>
					<Detail />
				</Route>
				<Route path='/create'>
					{isLogin ? <Create /> : <Redirect to='/login' />}
				</Route>
				<Route path='/edit/:blogId'>
					{isLogin ? <Edit /> : <Redirect to='/login' />}
				</Route>
				<Route path='/user/:userId'>
					{isLogin ? <User /> : <Redirect to='/login' />}
				</Route>
				<Route path='/my'>
					<My />
				</Route>
			</Suspense>
		</Switch>
	)
}