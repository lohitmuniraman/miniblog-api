import { Request, Response } from 'express';
import { Blog } from '../models/Blog';

export const createBlog = async (req: Request, res: Response) => {
    const { text, title, parentBlogId, parentUsername } = req.body
    // @ts-expect-error reading user from req
    const userId = req?.user?.userId
    // @ts-expect-error reading user from req
    const username = req?.user?.username
    // @ts-expect-error reading user from req
    const name = req?.user?.name

    const blog = await Blog.create({ text, userId, username, name, title, parentBlogId, parentUsername })
    res.status(201).json(blog)
}

export const listBlogs = async (req: Request, res: Response) => {
    //@ts-expect-error reading user from req
    const userId = req?.user?.userId
    const blogs = await Blog.find({ userId }).sort({ updatedAt: -1 })

    res.json(blogs)
}

export const listAllBlogs = async (req: Request, res: Response) => {
    const blogs = await Blog.find().sort({ updatedAt: -1 })

    res.json(blogs)
}

export const getBlog = async (req: Request, res: Response) => {
    const blogId = req.params.blogId

    const blog = await Blog.findOne({ _id: blogId })
    res.json(blog)
}

export const updateBlog = async (req: Request, res: Response) => {
    const { text, _id, title } = req.body

    const result = await Blog.findOneAndUpdate({ _id }, { $set: { text, title } }, { returnDocument: 'after' })

    res.json(result)
}