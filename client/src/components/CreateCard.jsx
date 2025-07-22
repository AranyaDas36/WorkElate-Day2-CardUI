import React, { useState } from 'react';

export function CreateCard({ onCreate }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description) return;
    onCreate({ title, description, tags: tags.split(',').map(t => t.trim()).filter(Boolean) });
    setTitle('');
    setDescription('');
    setTags('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-2">
      <h4 className="text-lg font-bold mb-2 text-blue-700">Create New Task</h4>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
        className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50"
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
        required
        className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50"
      />
      <input
        type="text"
        placeholder="Tags (comma separated)"
        value={tags}
        onChange={e => setTags(e.target.value)}
        className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-semibold shadow">Add</button>
    </form>
  );
}
