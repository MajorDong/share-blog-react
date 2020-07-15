import React, { useState, useEffect } from 'react';
import './My.less';
import { Avatar, List, Tag, Pagination, Modal, message } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import moment from 'moment';
import { connect } from 'react-redux';
import { AuthStoreState } from '../../reducers';
import { UserInfo } from '../../types/user-info';
import httpBlog from '../../service/blog/blog';


export interface MyProps {
	user: UserInfo
}
 
const My: React.FC<MyProps> = (props) => {
	const location = useLocation();
	const [page, setPage] = useState(() => Number(location.search.split('=')[1]) || 1 );
	const [total, setTotal] = useState(0);
	const [blogs, setBlogs] = useState([]);

	useEffect(() => {
		httpBlog.getBlogsByUserId(props.user.id, page).then( (res: any) => {
			setBlogs(res.data);
			setTotal(res.total);
			setPage(res.page);
		})
	},[page, props.user.id])

	const hanglePageChange = (page: number) => {
		setPage(page)
	}


	const handleDelete = (e: any, blogId: number) => {
		e.preventDefault();
		Modal.confirm({
			title: '此操作将永久删除该文件, 是否继续?',
			icon: <ExclamationCircleOutlined />,
			okText: '确定',
			okType: 'danger',
			cancelText: '取消',
			onOk() {
				httpBlog.deleteBlog(blogId.toString()).then(() => {
					setBlogs((blogs) => blogs.filter((blog: any) => blog.id !== blogId ))
				})
			},
			onCancel() {
				
			},
		});
	}

	const blogsHeader = (
		<Tag
			color="#3b5999"
			style={{ fontSize: '16px' }}
		>
			我的博客
		</Tag>
	)

	return ( 
		<>
			<div className="my">
				<section className="my-info">
					<Avatar className="avatar" size="large" src={props.user.avatar} />
					<h3>{props.user.usernaem}</h3>
				</section>
				<section>
				<List
						itemLayout="horizontal"
						dataSource={blogs}
						header={blogsHeader}
						renderItem={(blog: any) => (
							<List.Item
								key={blog.key}
								// eslint-disable-next-line jsx-a11y/anchor-is-valid
								actions={[
								<Link to={`/edit/${blog.id}`}>编辑</Link>, 
								<a onClick={(e)=> handleDelete(e, blog.id)}>删除</a>
							]}
							>
								<List.Item.Meta
									avatar={
										<div className="blog-user">
											<Avatar size="large" src={blog.user.avatar}></Avatar>
											<div>
												<Link to={`/user/${blog.user.id}`}>{blog.user.username}</Link>
											</div>
										</div>
									}
									title={
										<>
											<Link to={`/detail/${blog.id}`}>{blog.title}</Link>
											<span style={{'fontSize': '12px', 'padding' : '0 10px'}}>
												{moment(blog.createdAt).format('YYYY-MM-DD')}
												</span>
										</>
									}
									description={blog.description}
								/>
							</List.Item>
						)}
					>
					</List>
				</section>
				<section className="pagination">
					<Pagination
						current={page}
						showSizeChanger={false}
						total={total}
						showQuickJumper
						onChange={hanglePageChange}
					/>
				</section>
			</div>
		</>
	 );
}

const mapStateToProps = (state:AuthStoreState) => {
	return {
		user: state.user,
	}
}

 
export default connect(mapStateToProps)(My);