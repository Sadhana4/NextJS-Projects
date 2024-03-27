
const baseUrl = 'http://localhost:3001';

export const getAllBlogs = async () => {
  const res = await fetch(`${baseUrl}/blogs`, { cache: 'no-store' });
  const blogs = await res.json();
  return blogs;
}

export const addBlog = async (blog: any) => {
  const res = await fetch(`${baseUrl}/blogs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(blog)
  })
  const newTodo = await res.json();
  return newTodo;
}

export const editBlog = async (blog : any) => {
  const res = await fetch(`${baseUrl}/blogs/${blog.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(blog)
  })
  const updatedTodo = await res.json();
  return updatedTodo;
}

export const deleteBlog = async (id: string): Promise<void> => {
  await fetch(`${baseUrl}/blogs/${id}`, {
    method: 'DELETE',
  })
}