import React, { useState } from "react";
import axios from "axios";
import { createBook } from "../api/book.api";
import { useNavigate } from "react-router-dom";

function BookCreatePage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    auther: "",
    description: "",
    genre: "",
    like: 0,
    image: "",
    featured: false,
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await createBook(form);
      navigate("/books"); // redirect after success
    } catch (err) {
      setError("Failed to create book. Try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF1F3] px-4 py-20">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-center font-lora text-gray-800">
          Create New Book
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Book Title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
          />

          <input
            type="text"
            name="auther"
            placeholder="Author Name"
            value={form.auther}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
          />

          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
          />

          <input
            type="text"
            name="genre"
            placeholder="Genre (e.g. Fiction, Biography)"
            value={form.genre}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
          />

          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={form.image}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
          />

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="featured"
              checked={form.featured}
              onChange={handleChange}
              className="w-4 h-4"
            />
            <label className="text-sm">Mark as Featured</label>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition"
          >
            {loading ? "Creating..." : "Create Book"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default BookCreatePage;
