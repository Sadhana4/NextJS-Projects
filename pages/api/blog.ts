
// import { posts } from "../../data/db";

// export default function handler(req, res) {
//   const { method } = req;

//   switch (method) {
//     case "GET":
//       res.status(200).json(posts);
//       break;
//     case "POST":
//       const { title,body,image } = req.body;
//       posts.push({
//         id: posts.length + 1,
//         title,
//         image,
//         body
//       });
//       res.status(200).json(posts);
//       break;
//     default:
//       res.setHeader("Allow", ["GET", "POST"]);
//       res.status(405).end(`Method ${method} Not Allowed`);
//       break;
//   }
// }
import { IBlog } from "@/types/blogs";


const baseUrl = 'http://localhost:3001';

export const getAllBlogs = async (): Promise<IBlog[]> => {
  const res = await fetch(`${baseUrl}/blogs`, { cache: 'no-store' });
  const blogs = await res.json();
  return blogs;
}

export const addBlog = async (blog: IBlog): Promise<IBlog> => {
  const res = await fetch(`${baseUrl}/blogs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    body: JSON.stringify(blog)
  })
  const newTodo = await res.json();
  return newTodo;
}

export const editBlog = async (blog: IBlog): Promise<IBlog> => {
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