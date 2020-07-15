import React, { useState } from 'react';
import { Input, Switch } from 'antd';
import './Create.less';
import httpBlog from '../../service/blog/blog'
import { useHistory } from 'react-router-dom';

const { TextArea } = Input;

export interface CreateProps {
	
}

const Create: React.FC<CreateProps> = () => {
	const history = useHistory();
	const [atIndex, setAtIndex] = useState(true);
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [content, setContent] = useState('')

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

	const handleConfrim = () => {
		httpBlog.createBlog({
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
			<div className="create">
				<h1>创建文章</h1>
				<h3>文章标题</h3>
				<Input 
					value={title}
					onChange={handleTitleChange}
				/>
				<p className="msg">限17个字</p>
				<h3>内容简介</h3>
				<TextArea 
					value={description}
					autoSize={{ minRows: 3, maxRows: 5 }}
					onChange={handleDesChange}
				/>
				<p className="msg">限制30个子</p>
				<h3>文章内容</h3>
				<TextArea 
					value={content}
					autoSize={{ minRows: 15, maxRows: 20 }}
					onChange={handleContentChange}
				/>
				<div className="switch">
					<Switch checkedChildren="首页展示" unCheckedChildren="自己可见"  
						onClick={handleOnClick} 
						defaultChecked
					/>
				</div>
				<button onClick={handleConfrim}>确定</button>
			</div>
		</>
	 );
}

export default Create;