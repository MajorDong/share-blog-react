import React, { useEffect, useState } from 'react';
import httpBlog from '../../service/blog/blog';
import { List, Avatar, Tag, Pagination } from 'antd';
import moment from 'moment';
import { Link, useHistory, useLocation } from 'react-router-dom';
import './index.less'

export interface IndexProps {

}

const Index: React.FC<IndexProps> = () => {
	const history = useHistory();
	const location = useLocation();
	const [blogs, setBlogs] = useState([]);
	const [page, setPage] = useState(() => Number(location.search) || 1);
	const [total, setTotal] = useState(0);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		httpBlog.getIndexBlog(page).then((res: any) => {
			setBlogs(res.data);
			setPage(res.page);
			setTotal(res.total);
			setLoading(false);
		})
	}, [page])

	const blogsHeader = (
		<Tag
			color="#3b5999"
			style={{ fontSize: '16px' }}
		>
			博客列表
		</Tag>
	)

	const handlePageChange = (page: number, pageSize: number | undefined) => {
		setPage(page)
		history.push(`/?page=${page}`)
	}

	return (
		<>
			<div className="index">
				<section className="blog-posts">
					<List
						loading={loading}
						itemLayout="horizontal"
						dataSource={blogs}
						header={blogsHeader}
						renderItem={(blog: any) => (
							<List.Item
								key={blog.key}
							>
								<List.Item.Meta
									avatar={
										<div className="blog-user">
											<Avatar size="large" src={blog.user.avatar}></Avatar>
											<div>
												<Link to={`/user/${blog.user.userId}`}>{blog.user.username}</Link>
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
						showSizeChanger={false}
						total={total}
						showQuickJumper
						onChange={handlePageChange}
					/>
				</section>
			</div>
		</>
	);
}

export default Index;