"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { getAllBlogs } from '@/pages/api/blog';
import { IBlog } from '@/types/blogs';
import EditBlogs from '../edit-blogs/page';
import DeleteBlogs from '../delete-blogs/page';

interface BlogProps {
  blogs :IBlog[];
}
const Blogs:React.FC<BlogProps> = async () =>  {



  const blogs = await getAllBlogs();
  console.log(blogs);
  // const [title, setTitle] = useState<string>("");



  // if(blogs[0].title){
  //   const searchData = blogs.filter((blog : any)=> blog.title.toLowerCase().include(blogs[0].title));
  //   blogs = searchData
  // }

  return (
    <div className=''>
      <main className='p-8'>
        <p className='text-3xl text-center'>Blogs</p>
        <div className='max-w-full'>
          <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
            <div className="grid place-items-center h-full w-12 text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            <input
              className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
              type="text"
              id="search"
              placeholder="Search something.."
              // value={title ? title : ""}
              // onChange={(e)=> setTitle(e.target.value)}
              />
          </div>
        </div>
        <div className='grid grid-cols-3'>
          {blogs.map((blog) => {
            return (
              <div className='grid w-full' key={blog.id}>
                <div className="card grid-cols-3 m-3 shadow-lg">
                  <Image width={500}
                    height={500} src={blog.image} alt='image'></Image>
                  <div className="card-title font-bold capitalize p-3">
                    {blog.title}
                  </div>
                  <div className="card-body p-3">
                    {blog.body}
                  </div>
                  <div className="card-footer flex justify-end">
                    <EditBlogs key={blog.id} blog={blog} />
                    <DeleteBlogs key={blog.id} blog={blog}/>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  )
}

export default Blogs;
