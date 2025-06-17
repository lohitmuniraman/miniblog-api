import { Request, Response } from 'express';
import { Blog } from '../models/Blog';

export const createBlog = async (req: Request, res: Response) => {
    const { text } = req.body
    // @ts-expect-error reading user from req
    const userId = req?.user?.id
    // @ts-expect-error reading user from req
    const username = req?.user?.username

    const blog = await Blog.create({ text, userId, username })
    res.status(201).json(blog)
}

export const listBlogs = async (req: Request, res: Response) => {
    //@ts-expect-error reading user from req
    const userId = req?.user?.id
    const blogs = await Blog.find({ userId }).sort({ createdAt: -1 })

    res.json(blogs)
}

export const getBlog = async (req: Request, res: Response) => {
    const blogId = req.params.blogId

    const blog = await Blog.findOne({ _id: blogId })
    res.json(blog)
}

export const updateBlog = async (req: Request, res: Response) => {
    const { text, _id } = req.body

    const result = await Blog.findOneAndUpdate({ _id }, { $set: { text } }, { returnDocument: 'after' })

    res.json(result)
}