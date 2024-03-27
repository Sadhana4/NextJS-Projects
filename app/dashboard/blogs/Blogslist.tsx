import { getAllBlogs } from '@/pages/api/blog'
import Image from 'next/image'
import React from 'react'
import EditBlogs from '../edit-blogs/page'
import DeleteBlogs from '../delete-blogs/page'

export default async function Blogslist({ title }: { title: string }) {
    var blogs: any[] = await getAllBlogs()
    if (title) {
        blogs = blogs.filter((item: { title: string }) => item.title.toLowerCase().includes(title))
    }
    if (blogs.length == 0) {
        return <h1>No Blogs Found</h1>
    }
    return (
        <div className='grid grid-cols-3'>
            {blogs.map((blog: any) => {
                return (
                    <div className='grid w-full' key={blog.title}>
                        <div className="card grid-cols-3 m-3 shadow-lg">
                            <Image height={500} width={500} src={blog.image} alt='image'></Image>
                            <div className="card-title font-bold capitalize p-3">
                                {blog.title}
                            </div>
                            <div className="card-body p-3">
                                {blog.body}
                            </div>
                            <div className="card-footer flex justify-end">
                                <EditBlogs key={blog.id} blog={blog} />
                                <DeleteBlogs key={blog.id} blog={blog} />
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    )
}
