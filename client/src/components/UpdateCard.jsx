import React, { useState } from 'react';

export function UpdateCard({ task, onUpdate, onCancel }) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [tags, setTags] = useState(task.tags ? task.tags.join(', ') : '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description) return;
    onUpdate({
      title,
      description,
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md w-full bg-white p-6 space-y-5"
    >
      <h2 className="text-2xl font-bold text-center text-teal-700 mb-4">
        Update Task
      </h2>

      <div className="space-y-1">
        <label className="block text-lg font-bold text-gray-700">Title:</label>
        <input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50"
        />
      </div>

      <div className="space-y-1">
        <label className="block text-lg font-bold text-gray-700">Description:</label>
        <input
          type="text"
          placeholder="Enter description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50"
        />
      </div>

      <div className="space-y-1">
        <label className="block text-lg font-bold text-gray-700">Tags:</label>
        <input
          type="text"
          placeholder="e.g. #frontend, #react"
          value={tags}
          onChange={e => setTags(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50"
        />
      </div>

      <div className="flex justify-end gap-3 pt-3">
        <button
          type="submit"
          className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg font-semibold shadow-md transition"
        >
          Update
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg font-semibold transition"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
