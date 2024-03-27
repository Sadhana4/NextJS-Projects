"use client"
import { addBlog } from '@/pages/api/blog';
import { useRouter } from 'next/navigation';
import React, { FormEventHandler, useState } from 'react';
import { v4 as uuidv4 } from "uuid";
import { UploadButton } from "../../../utils/uploadthing";


const CreateBlogs = () => {
  const router = useRouter();
  const [newTitle, setNewTitle] = useState<string>('');
  const [newBody, setNewBody] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('');


  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    await addBlog({
      id: uuidv4(),
      title: newTitle,
      body: newBody,
      image: imageUrl

    });

    setNewTitle("");
    setNewBody("");
    setImageUrl("");

    router.refresh();
    router.push('/dashboard/blogs');
  };
  return (
    <div className='pt-24'>
      <p className='text-3xl text-center'>Create Post</p>
      <div className='grid'>
        <div className="card w-2xl mx-auto shadow-md">
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
              <div className='mt-4'>

                <UploadButton
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    // Do something with the response
                    console.log("Files: ", res);
                    setImageUrl(res[0].url);
                    alert("Upload Completed");
                  }}
                  onUploadError={(error: Error) => {
                    // Do something with the error.
                    alert(`ERROR! ${error.message}`);
                  }}
                />
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
