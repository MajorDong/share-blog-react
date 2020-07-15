import React, { useState, useEffect } from 'react';
import './Edit.less'
import { Input, Switch } from 'antd';
import { useHistory, useParams } from 'react-router-dom';
import httpBlog from '../../service/blog/blog'

const { TextArea } = Input

export interface EditProps {

}

const Edit: React.FC<EditProps> = () => {
	const params: any = useParams();
	const history = useHistory();
	const [atIndex, setAtIndex] = useState(false);
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [content, setContent] = useState('')

	useEffect(() => {
		httpBlog.getDetail(params.blogId).then((res: any) => {
			console.log(res)
			setTitle(res.data.title)
			setDescription(res.data.description)
			setContent(res.data.content)
			setAtIndex(res.data.atIndex)
		})
	}, [params.blogId])

	const handleTitleChange = (e: any) => {
		setTitle(e.target.value);
	}

	const handleDesChange = (e: any) => {
		setDescription(e.target.value);
	}

	const handleContentChange = (e: any) => {
		setContent(e.target.value);
	}

	const handleOnClick = (checked: boolean) => {
		setAtIndex(() => checked)
	}

	const handleUpdate = () => {
		httpBlog.upDateBlog(params.blogId, {
			title: title,
			description: description,
			content:  content,
			atIndex: atIndex
		}).then((res) => {
			history.push(`/detail/${res.data.id}`)
		})
	}

	return (
		<>
			<div className="edit">
				<h1>编辑文章</h1>
				<h3>文章标题</h3>
				<Input
					value={title}
					onChange={handleTitleChange}
				/>
				<p className="msg">限17个字</p>
				<h3>内容简介</h3>
				<TextArea
					value={description}
					onChange={handleDesChange}
					autoSize={{ minRows: 3, maxRows: 5 }}
				/>
				<p className="msg">限制30个字</p>
				<h3>文章内容</h3>
				<TextArea
					value={content}
					onChange={handleContentChange}
					autoSize={{ minRows: 15, maxRows: 20 }}
				/>
				<div className="switch">
					<Switch checkedChildren="首页展示" unCheckedChildren="自己可见" defaultChecked onChange={handleOnClick} />
				</div>
				<button onClick={handleUpdate}>确定</button>
			</div>
		</>
	);
}

export default Edit;