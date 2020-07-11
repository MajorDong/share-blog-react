import { http } from '../requset';
import { message } from 'antd';

export enum BlogUrl {
	getList = '/blog',
	getDetail = '/blog/:blogId',
	create = '/blog/',
	update = '/blog/:blogId',
	Delete = '/blog/:blogId'
}

export interface BlogParams {
	page?: number,
	userId?: number,
	atIndex?: boolean,
}

export interface Blog {
	title: string,
	content: string,
	description: string,
	atIndex: Boolean,
}

export default {
	getBlogs(config: BlogParams) {
		return http.get(BlogUrl.getList, {
			params: {
				page: config.page,
				userId: config.userId,
				atIndex: config.atIndex,
			}
		})
			.then(res => res.data)
			.catch(err => {
				message.error(err.data.msg);
				throw new Error(err);
			})
	},

	getIndexBlog(page: number) {
		return this.getBlogs({
			page,
			atIndex: true,
		})
	},

	getBlogsByUserId(userId: number, page: number) {
		return this.getBlogs({
			page,
			userId,
		})
	},

	getDetail(blogId: string) {
		return http.get(BlogUrl.getDetail.replace(':blogId', blogId))
			.then(res => res.data)
			.catch(err => {
				message.error(err.data.msg);
				throw new Error(err);
			})
	},

	createBlog(blog: Blog) {
		return http.post(BlogUrl.create, blog)
			.then(res => {
				message.success(res.data.msg)
				return res.data
			})
			.catch(err => {
				message.warn(err.data.msg);
				throw new Error(err);
			})
	},

	deleteBlog(blogId: string) {
		return http.delete(BlogUrl.Delete.replace(':blogId', blogId))
			.then( res => {
				message.success(res.data.msg);
			})
			.catch( err => {
				message.warn(err.data.msg);
			})
	},

	upDateBlog(blogId: string, blog: Blog) {
		return http.patch(BlogUrl.update.replace(':blogId', blogId), blog)
			.then( res => {
				message.success(res.data.msg)
				return res.data
			}).catch( err => {
				message.warn(err.data.msg)
			})
	}

}
