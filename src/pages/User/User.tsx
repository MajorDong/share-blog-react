import React, { useState, useEffect } from 'react';
import { Avatar, Pagination} from 'antd';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import httpBlog from '../../service/blog/blog';
import './User.less';
import { Link } from 'react-router-dom';

export interface UserProps {

}

const User: React.FC<UserProps> = () => {
	const param: any = useParams();
	const history = useHistory();
	const location = useLocation();
	const [userId] = useState(() => param.userId)
	const [blogs, setBlogs] = useState([])
	const [user, setUser] = useState({} as any)
	const [total, setTotal] = useState(0)
	const [page, setPage] = useState(() => Number(location.search.split('=')[1]) || 1 )

	useEffect(() => {
		httpBlog.getBlogsByUserId(userId, page).then((res:any) => {
			setBlogs(res.data);
			setUser(res.data[0].user);
			setTotal(res.total);
			setPage(res.page);
		})
	}, [userId, page])

	const splitDate = (dateStr: string) => {
		let dateObj = typeof dateStr === 'object' ? dateStr : new Date(dateStr)
		return {
			date: dateObj.getDate(),
			month: dateObj.getMonth() + 1,
			year: dateObj.getFullYear()
		}
	}

	const handlePageChange = (page: number) => {
		setPage(page);
		console.log(location)
		history.push(`${location.pathname}?page=${page}`)
	}

	return (
		<>
			<div className="user-page">
				<section className="user-info">
					<Avatar size="large" src={user.avatar} />
					<h3>{user.username}</h3>
				</section>
				<section>
					{blogs.map((blog: any) => (
						<div key={blog.id} className="item">
							<div className="date">
								<span className="day">{splitDate(blog.createdAt).date}</span>
								<span className="month">{splitDate(blog.createdAt).month}月</span>
								<span className="year">{splitDate(blog.createdAt).year}</span>
							</div>
							<div className="blog-info">
								<h3><Link to={`/detail/${blog.id}`}>{blog.title}</Link></h3>
								<p>{blog.description}</p>
							</div>
						</div>
					))}
				</section>
				<section className="pagination">
					<Pagination
						current={page}
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

export default User;