import React, { useState } from 'react';

export function UpdateCard({ task, onUpdate, onCancel }) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [tags, setTags] = useState(task.tags ? task.tags.join(', ') : '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description) return;
    onUpdate({ title, description, tags: tags.split(',').map(t => t.trim()).filter(Boolean) });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-2">
    <h2>Title:</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
        className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50"
      />

      <h2>Description:</h2>
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
        required
        className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50"
      />
      <h2>Tags:</h2>
      <input
        type="text"
        placeholder="Tags (comma separated)"
        value={tags}
        onChange={e => setTags(e.target.value)}
        className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50"
      />
      <div className="flex gap-2 mt-2">
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-semibold shadow">Update</button>
        <button type="button" onClick={onCancel} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition font-semibold shadow">Cancel</button>
      </div>
    </form>
  );
}
