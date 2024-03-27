import { editBlog } from '@/pages/api/blog';
import { useRouter } from 'next/navigation';
import React, { FormEventHandler, useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import { Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure } from "@nextui-org/react";
import { UploadButton } from '@/utils/uploadthing';




const EditBlogs = ({ blog }: { blog: any }) => {
    const router = useRouter();
    const [editTitle, setEditTitle] = useState<string>(blog.title);
    const [editBody, setEditBody] = useState<string>(blog.body);
    const [editImageUrl, setEditImageUrl] = useState<string>(blog.image);

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        await editBlog({
            id: blog.id,
            title: editTitle,
            body: editBody,
            image: editImageUrl
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
                                    <div className='mt-3'>
                                        <UploadButton
                                            endpoint="imageUploader"
                                            onClientUploadComplete={(res) => {
                                                // Do something with the response
                                                console.log("Files: ", res);
                                                setEditImageUrl(res[0].url);
                                                alert("Upload Completed");
                                            }}
                                            onUploadError={(error: Error) => {
                                                // Do something with the error.
                                                alert(`ERROR! ${error.message}`);
                                            }}
                                        />
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

