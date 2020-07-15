import React, { useEffect } from 'react';
import { message, Form, Input, Button, } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './Login.less'
import { Link, useHistory } from 'react-router-dom'
import { connect } from 'react-redux';
import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import { fetchLogin } from '../../actions/auth';


const Login = (props: any) => {
	const [form] = Form.useForm();
	const history = useHistory();

	useEffect(() => {
		message.info('请登录账号')
	}, [])

	const onFinish = async (values: any) => {
		await props.fetchLogin(values);
		history.push('/?page=1')
	};

	return (
		<div className="login-wrapper">
			<div className="login-box">
				<h2>登录</h2>
				<Form
					name="login"
					className="login-form"
					onFinish={onFinish}
					form={form}
				>
					<Form.Item
						label="用户名"
						name="username"
						rules={[{ required: true, message: '请输入用户名' }]}
					>
						<Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
					</Form.Item>
					<Form.Item
						label="密码"
						name="password"
						rules={[{ required: true, message: '请输入密码' }]}
					>
						<Input
							prefix={<LockOutlined className="site-form-item-icon" />}
							type="password"
							placeholder="Password"
						/>
					</Form.Item>
					<Form.Item className="login-button">
						<Button type="primary" htmlType="submit" className="login-form-button">
							登录
        		</Button>
					</Form.Item>
					<span>没有账号？<Link to='/register'>注册新用户</Link></span>
				</Form>
			</div>
		</div>
	);
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
	return bindActionCreators({
		fetchLogin,
	}, dispatch)
}

export default connect(null, mapDispatchToProps)(Login);