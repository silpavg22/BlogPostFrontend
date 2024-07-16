import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BlogManager = () => {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [editingBlog, setEditingBlog] = useState(null);

  const apiBaseUrl = 'http://localhost:5000'; // Change to your backend's address

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(`${apiBaseUrl}/blogposts`);
      setBlogs(response.data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  const handleCreateOrUpdateBlog = async (e) => {
    e.preventDefault();
    if (editingBlog) {
      await updateBlog(editingBlog._id);
    } else {
      await createBlog();
    }
  };

  const createBlog = async () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (image) {
      formData.append('file', image);
    }

    try {
      const response = await axios.post(`${apiBaseUrl}/blogposts`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      fetchBlogs();
      setTitle('');
      setContent('');
      setImage(null);
    } catch (error) {
      console.error('Error creating blog:', error);
    }
  };

  const updateBlog = async (id) => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (image) {
      formData.append('file', image);
    }

    try {
      const response = await axios.put(`${apiBaseUrl}/blogposts/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      fetchBlogs();
      setTitle('');
      setContent('');
      setImage(null);
      setEditingBlog(null);
    } catch (error) {
      console.error('Error updating blog:', error);
    }
  };

  const deleteBlog = async (id) => {
    try {
      await axios.delete(`${apiBaseUrl}/blogposts/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setBlogs(blogs.filter((blog) => blog._id !== id));
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  const handleEditBlog = (blog) => {
    setEditingBlog(blog);
    setTitle(blog.title);
    setContent(blog.content);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-4">
      <h2 className="text-2xl font-bold mb-4">Blog Manager</h2>
      <form onSubmit={handleCreateOrUpdateBlog} className="bg-white p-4 rounded shadow-md w-full max-w-lg mb-4">
        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Image</label>
          <input
            type="file"
            onChange={handleImageChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
        >
          {editingBlog ? 'Update Blog' : 'Create Blog'}
        </button>
      </form>
      <div className="w-full max-w-lg">
        {blogs.map((blog) => (
          <div key={blog._id} className="bg-white p-4 rounded shadow-md mb-4">
            <h3 className="text-xl font-bold">{blog.title}</h3>
            <p>{blog.content}</p>
            {blog.image_url && (
              <img
                src={`data:image/jpeg;base64,${blog.image_url}`}
                alt={blog.title}
                className="mt-2 mb-4 w-full h-auto rounded"
              />
            )}
            <div className="mt-4">
              <button
                onClick={() => handleEditBlog(blog)}
                className="mr-2 bg-yellow-500 text-white py-1 px-2 rounded hover:bg-yellow-700 transition duration-200"
              >
                Edit
              </button>
              <button
                onClick={() => deleteBlog(blog._id)}
                className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-700 transition duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogManager;
