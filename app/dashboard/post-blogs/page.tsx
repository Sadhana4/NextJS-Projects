"use client"
import { addBlog } from '@/pages/api/blog';
import { useRouter } from 'next/navigation';
import React, { FormEventHandler, useState } from 'react';
import { v4 as uuidv4 } from "uuid";


const CreateBlogs = () => {
  const router = useRouter();
  const [newTitle, setNewTitle] = useState<string>('');
  const [newBody, setNewBody] = useState<string>('');
  const [newImage, setNewImage] = useState<any>('');

  // const handleFile = (e:any) => {

  //   let selectedFile = e.target.files[0];
  //   console.log(selectedFile);
  //   setNewImage(selectedFile);
  //   console.log(newImage)

  // }
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", newImage)
    console.log(formData)
    await addBlog({
      id: uuidv4(),
      title: newTitle,
      body: newBody,
      image: newImage

    });

    setNewTitle("");
    setNewBody("");
    setNewImage("");

    router.refresh();
    router.push('/dashboard/blogs');
  };
  return (
    <div className='pt-24'>
      <p className='text-3xl text-center'>Create Blogs</p>
      <div className='grid'>
        <div className="card max-w-lg mx-auto shadow-md">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div>
                <label className='form-label' htmlFor="title">Title</label>
                <input name='title' className='form-control' type="text" onChange={(e) => setNewTitle(e.target.value)} value={newTitle} required />
              </div>
              <div>
                <label className='form-label' htmlFor="body">Description</label>
                <textarea name='body' className='form-control' onChange={(e) => setNewBody(e.target.value)} value={newBody} required />
              </div>
              <div>
                <label className='form-label' htmlFor="image">Image</label>
                <input name='image' className='form-control' type="file" onChange={(e) => setNewImage(e.target.value)}/>
              </div>


              <button className='btn btn-primary mt-3' type='submit'>Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateBlogs
