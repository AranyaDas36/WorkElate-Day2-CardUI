import React, { useEffect, useState, useMemo, useCallback } from 'react';
import axios from 'axios';
import { Card } from './Card';
import { CreateCard } from './CreateCard';

const API_BASE_URL = 'https://cardui.onrender.com/api';

export function Home() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreate, setShowCreate] = useState(false);
  const [selectedTag, setSelectedTag] = useState('All');
  const [toast, setToast] = useState(null);

  // Toast notification
  const showToast = useCallback((msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2000);
  }, []);

  // Fetch all tasks
  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/tasks`);
      setTasks(res.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch tasks');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Create task
  const handleCreate = async (task) => {
    try {
      await axios.post(`${API_BASE_URL}/tasks`, task);
      fetchTasks();
      setShowCreate(false);
      showToast('Task created successfully!');
    } catch (err) {
      setError('Failed to create task');
    }
  };

  // Update task
  const handleUpdate = async (id, updatedTask) => {
    try {
      await axios.put(`${API_BASE_URL}/tasks/${id}`, updatedTask);
      fetchTasks();
      showToast('Task updated successfully!');
    } catch (err) {
      setError('Failed to update task');
    }
  };

  // Delete task
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/tasks/${id}`);
      fetchTasks();
      showToast('Task deleted successfully!');
    } catch (err) {
      setError('Failed to delete task!');
    }
  };

  // Get all unique tags from tasks
  const allTags = useMemo(() => {
    const tagSet = new Set();
    tasks.forEach(task => {
      (task.tags || []).forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet);
  }, [tasks]);

  // Filtered tasks based on selected tag
  const filteredTasks = useMemo(() => {
    if (selectedTag === 'All') return tasks;
    return tasks.filter(task => (task.tags || []).includes(selectedTag));
  }, [tasks, selectedTag]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-[#168C82] to-[#2893D4] sm:p-6 lg:p-8 flex flex-col">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-6 right-6 z-[100] bg-teal-700 text-white px-6 py-3 font-bold border-1 rounded-4xl text-xl animate-fade-in">
          {toast}
        </div>
      )}
      <header className="mb-8">
      <h2 className="text-6xl font-extrabold text-center tracking-tight bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
  Card.<span className="lowercase">ui</span>
</h2>



      </header>
      {/* Tag Filter UI */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        <button
          className={`px-4 py-1 rounded-full border text-sm font-medium transition shadow-sm ${selectedTag === 'All' ? 'bg-teal-700 text-white border-blue-300' : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-50'}`}
          onClick={() => setSelectedTag('All')}
        >
          All
        </button>
        {allTags.map(tag => (
          <button
            key={tag}
            className={`px-4 py-1 rounded-full border text-sm font-medium transition shadow-sm ${selectedTag === tag ? 'bg-teal-700 text-white border-black-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-50'}`}
            onClick={() => setSelectedTag(tag)}
          >
            {tag}
          </button>
        ))}
      </div>
      <main className="flex-grow">
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : filteredTasks.length === 0 ? (
          <p className="text-center text-gray-400 mt-10">No tasks found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTasks.map((task) => (
              <Card
                key={task._id}
                task={task}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
                showToast={showToast}
              />
            ))}
          </div>
        )}
      </main>
      {/* Floating Add Button */}
      <button
        onClick={() => setShowCreate(true)}
        className="fixed bottom-8 right-8 w-16 h-16 rounded-full bg-teal-700 text-white text-4xl shadow-lg flex items-center justify-center hover:bg-teal-800 transition z-50 border-4 border-white"
        aria-label="Add Task"
      >
        +
      </button>
      {/* Modal-like CreateCard */}
      {showCreate && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <div className="absolute inset-0 bg-white/30 backdrop-blur-sm z-0" />
          <div className="bg-white p-8 rounded-2xl min-w-[320px] relative shadow-2xl w-full max-w-md z-10">
            <button
              onClick={() => setShowCreate(false)}
              className="absolute top-2 right-2 text-2xl text-gray-400 hover:text-gray-600"
              aria-label="Close"
            >
              ×
            </button>
            <CreateCard onCreate={handleCreate} />
          </div>
        </div>
      )}
    </div>
  );
}
