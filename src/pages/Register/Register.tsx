import  React from 'react';
import {  Form, Input, Button, } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './Register.less';
import { connect } from 'react-redux';
import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import { fetchRegister } from '../../actions/auth';
import { useHistory } from 'react-router-dom';

export interface RegisterProps {
	
}
 
const Register  = (props:any) => {
	const [form] = Form.useForm();
	const history = useHistory();

	const onFinish = (value:any) => {
		props.fetchRegister(value).then(()=>{
			history.push('/');
			history.go(0);
		})
	}

	return ( 
		<>
			<div className="register-wrapper">
			<div className="register-box">
				<h2>注册</h2>
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
					<Form.Item className="register-button">
						<Button type="primary" htmlType="submit" className="register-form-button">
							注册
        		</Button>
					</Form.Item>
				</Form>
			</div>
		</div>
		</>
	 );
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
	return bindActionCreators({
		fetchRegister,
	}, dispatch)
}
 
export default connect(null, mapDispatchToProps)(Register);
