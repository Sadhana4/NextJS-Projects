import { editBlog } from '@/pages/api/blog';
import { IBlog } from '@/types/blogs';
import { useRouter } from 'next/navigation';
import React, { FormEventHandler, useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import { Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure } from "@nextui-org/react";


interface EditBlogProps {
    blog: IBlog
}



const EditBlogs: React.FC<EditBlogProps> = ({ blog }) => {
    const router = useRouter();
    const [editTitle, setEditTitle] = useState<string>(blog.title);
    const [editBody, setEditBody] = useState<string>(blog.body);
    const [editImage, setEditImage] = useState<string>(blog.image);

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        await editBlog({
            id: blog.id,
            title: editTitle,
            body: editBody,
            image: editImage
        });

        router.refresh();
    };
    return (
        <div>

            <Button isIconOnly className='bg-transparent' onPress={onOpen}><FiEdit
                cursor='pointer'
                className='text-blue-500'
                size={25}

            /></Button>
            <Modal className='p-3' isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Edit Blog</ModalHeader>
                            <ModalBody>
                                <form onSubmit={handleSubmit}>
                                    <div>
                                        <label className='form-label' htmlFor="title">Title</label>
                                        <input name='title' className='form-control' type="text" onChange={(e) => setEditTitle(e.target.value)} value={editTitle} required />
                                    </div>
                                    <div>
                                        <label className='form-label' htmlFor="body">Description</label>
                                        <textarea name='body' className='form-control' onChange={(e) => setEditBody(e.target.value)} value={editBody} required />
                                    </div>
                                    <div>
                                        <label className='form-label' htmlFor="image">Image</label>
                                        <input id='image' name='image' className='form-control' type="file" onChange={(e) => setEditImage(e.target.value)} value={editImage} />
                                    </div>


                                    <Button className='btn btn-primary mt-3 ms-auto' type='submit' onPress={onClose}>Submit</Button>
                                </form>

                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>

        </div>
    )
}

export default EditBlogs

