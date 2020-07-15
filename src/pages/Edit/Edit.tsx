import  React from 'react';
import './Edit.less'
import { Input, Switch } from 'antd';

const {TextArea} = Input

export interface EditProps {
	
}
 
const Edit: React.FC<EditProps> = () => {
	return ( 
		<>
		<div className="edit">
			<h1>创建文章</h1>
			<h3>文章标题</h3>
			<Input />
			<p className="msg">限17个字</p>
			<h3>内容简介</h3>
			<TextArea 
				autoSize={{ minRows: 3, maxRows: 5 }}
			/>
			<p className="msg">限制30个子</p>
			<h3>文章内容</h3>
			<TextArea 
				autoSize={{ minRows: 15, maxRows: 20 }}
			/>
			<div className="switch">
				<Switch checkedChildren="首页展示" unCheckedChildren="自己可见" defaultChecked />
			</div>
			<button>确定</button>
		</div>
	</>
	 );
}
 
export default Edit;