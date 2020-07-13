import React, { useEffect } from 'react';
import { AuthStoreState } from '../../reducers/index';
import { UserInfo } from '../../types/user-info';
import { fetchCheckIsLogined, fetchLogout } from '../../actions/auth'
import { bindActionCreators, Dispatch, AnyAction } from 'redux'
import { connect } from 'react-redux'
import './blog-header.less'
import { Avatar, Popover, Menu, Dropdown } from 'antd';
import { PlusCircleOutlined, UserOutlined } from '@ant-design/icons'

export interface BlogHeaderProps {
	isLogin: boolean,
	user: UserInfo,
	fetchCheckIsLogined: () => void,
	fetchLogout: () => void,
}

function BlogHeader(props: BlogHeaderProps) {
	const {
		isLogin,
		user,
		fetchCheckIsLogined,
		fetchLogout,
	} = props

	useEffect(() => {
		fetchCheckIsLogined();
	},[fetchCheckIsLogined])

	const hangleOnCheckOut = () => {
		fetchLogout();
	}

	const headerBeforeLogin = (
		<div className="blog-header-nologin">
			<div className="banner">
				<div className="logo">
					BlogTalk
				</div>
				<div className="slogan-wrapper">
					<h1>We think through blogs.</h1>
					<div className="line"></div>
					<div className="title">博客交流思想 LET'S SHARE</div>
					<div>
						<button className="header-button">立即登录</button>
						<button className="header-button">注册账号</button>
					</div>
				</div>
			</div>
		</div>
	)

	const popoverContent = (
		<div>添加新文章</div>
	)

	const userMenu = (
		<Menu>
			<Menu.Item key="0">
				<span>我的文章</span>
			</Menu.Item>
			<Menu.Item key="1">
				<span onClick={hangleOnCheckOut}>注销</span>
			</Menu.Item>
		</Menu>
	)

	const headerAfterLogin = (
		<div className="header-after-login">
			<h1>BlOGTALK</h1>
			<div className="add-article">
				<Popover content={popoverContent}>
					<PlusCircleOutlined style={{ 'color': '#52c41a', 'fontSize': '32px' }} />
				</Popover>
			</div>
			<div className="user">
				<Dropdown overlay={userMenu} trigger={['click']} placement="bottomCenter" arrow>
					<Avatar icon={<UserOutlined />} src={user.avatar} alt={user.usernaem} />
				</Dropdown>	
			</div>
		</div >
	)

	return (
		<>
			<div className="blog-header">
				{ isLogin
					? headerAfterLogin
					: headerBeforeLogin
				}
			</div>
		</>
	)
}

const mapStateToProps = (state: AuthStoreState) => {
	return {
		isLogin: state.isLogin,
		user: state.user
	}
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
	return bindActionCreators({
		fetchCheckIsLogined,
		fetchLogout
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogHeader)