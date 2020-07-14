import React, { useState, useMemo, useEffect } from 'react';
import { Avatar } from 'antd';
import './Detail.less';
import httpBlog from '../../service/blog/blog';
import { Link, useParams } from 'react-router-dom';
import marked from 'marked';
import moment from 'moment'

export interface DetailProps {

}

export interface BlogId {
	blogId: string
}

const Detail: React.FC<DetailProps> = () => {
	const params: BlogId = useParams();
	const [blogId,] = useState(() => params.blogId);
	const [blog, setBlog] = useState({ title: '', rawContent: '', createdAt: '' });
	const [user, setUser] = useState({} as any)

	useEffect(() => {
		httpBlog.getDetail(blogId).then((res: any) => {
			console.log(res)
			setBlog({
				title: res.data.title,
				rawContent: res.data.content,
				createdAt: res.data.createdAt,
			});
			setUser(res.data.user)
		}
		)
	}, [blogId])

	const markdown = useMemo(() => marked(blog.rawContent), [blog.rawContent])

	return (
		<>
			<div className="detail">
				<section className="user-info">
					<Avatar src={user.avatar} className="avatar" />
					<div className="info">
						<h3>{blog.title}</h3>
						<p>
							<Link to={`/user/${user.id}`}>{user.username}</Link>
						发布于{moment(blog.createdAt).format('YYYY-MM-DD')}
						</p>
					</div>
				</section>
				<section className="article" dangerouslySetInnerHTML={{ __html: markdown }}>
				</section>
			</div>
		</>
	);
}

export default Detail;