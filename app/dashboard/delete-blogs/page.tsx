
import React from 'react';
import { deleteBlog } from '@/pages/api/blog';
import { IBlog } from '@/types/blogs'
import { useRouter } from 'next/navigation';


import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { FiTrash2 } from 'react-icons/fi';

interface DeleteBlogProps {
    blog: IBlog
}

const DeleteBlogs: React.FC<DeleteBlogProps> = ({ blog }) => {
    const router = useRouter();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const handleDelete = async (id: string) => {
        await deleteBlog(id);
        router.refresh();
    };
    return (
        <div>
            <Button isIconOnly className='bg-transparent' onPress={onOpen}><FiTrash2
                cursor='pointer'
                className='text-red-500'
                size={25}
            /></Button>
            <Modal className='p-2' isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Delete Blog</ModalHeader>
                            <ModalBody>
                                <h3 className='text-lg'>
                                    Are you sure, you want to delete this task?
                                </h3>
                                <div className='flex gap-2 ms-auto'>
                                    <Button color='primary' onClick={() => handleDelete(blog.id)} onPress={onClose}>
                                        Yes
                                    </Button>
                                    <Button color="danger" onPress={onClose}>
                                        No
                                    </Button>
                                </div>
                            </ModalBody>

                        </>
                    )}
                </ModalContent>
            </Modal>


        </div>
    )
}

export default DeleteBlogs

