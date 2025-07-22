import React, { useState } from 'react';
import { UpdateCard } from './UpdateCard';

export function Card({ task, onUpdate, onDelete, showToast }) {
  const [editing, setEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Prevent card click when clicking Edit/Delete
  const stopPropagation = (e) => e.stopPropagation();

  const handleDelete = () => {
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    onDelete(task._id);
    setShowDeleteConfirm(false);
    setShowModal(false);
    if (showToast) showToast('Task deleted successfully');
  };

  return (
    <>
      <div
        className="bg-white border border-gray-100 rounded-2xl p-6 shadow-md hover:shadow-lg transition flex flex-col gap-2 cursor-pointer"
        onClick={() => !editing && setShowModal(true)}
      >
        <h3 className="text-xl font-bold mb-1 text-blue-800">{task.title}</h3>
        <p className="mb-2 text-gray-700 break-words max-h-24 overflow-y-auto whitespace-pre-line">{task.description}</p>
        <div className="mb-3 flex flex-wrap gap-2">
          {task.tags && task.tags.map((tag, idx) => (
            <span key={idx} className="bg-blue-50 text-blue-700 rounded-full px-3 py-1 text-xs font-semibold shadow-sm">{tag}</span>
          ))}
        </div>
        <div className="flex gap-2 mt-2">
          <button
            onClick={e => { stopPropagation(e); setEditing(true); }}
            className="px-4 py-1 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition font-medium shadow"
          >
            Edit
          </button>
          <button
            onClick={e => { stopPropagation(e); handleDelete(); }}
            className="px-4 py-1 rounded-lg bg-red-500 text-white hover:bg-red-600 transition font-medium shadow"
          >
            Delete
          </button>
        </div>
      </div>
      {/* Modal Popup for Card Details */}
      {showModal && !editing && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none">
          <div className="absolute inset-0 bg-white/30 backdrop-blur-sm z-0" />
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative pointer-events-auto z-10">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-2xl text-gray-400 hover:text-gray-600"
              aria-label="Close"
            >
              ×
            </button>
            <h3 className="text-2xl font-bold mb-4 text-blue-800">{task.title}</h3>
            <p className="mb-4 text-gray-700 whitespace-pre-line break-words">{task.description}</p>
            <div className="flex flex-wrap gap-2">
              {task.tags && task.tags.map((tag, idx) => (
                <span key={idx} className="bg-blue-100 text-blue-700 rounded-full px-3 py-1 text-xs font-semibold shadow-sm">{tag}</span>
              ))}
            </div>
            <div className="flex gap-2 mt-6 justify-end">
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition font-medium shadow"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none">
          <div className="absolute inset-0 bg-white/30 backdrop-blur-sm z-0" />
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative pointer-events-auto z-10">
            <button
              onClick={() => setEditing(false)}
              className="absolute top-2 right-2 text-2xl text-gray-400 hover:text-gray-600"
              aria-label="Close"
            >
              ×
            </button>
            <UpdateCard
              task={task}
              onUpdate={(updatedTask) => {
                onUpdate(task._id, updatedTask);
                setEditing(false);
                if (showToast) showToast('Task updated successfully');
              }}
              onCancel={() => setEditing(false)}
            />
          </div>
        </div>
      )}
      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none">
          <div className="absolute inset-0 bg-white/30 backdrop-blur-sm z-0" />
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm relative flex flex-col items-center pointer-events-auto z-10">
            <h3 className="text-xl font-bold mb-4 text-red-600">Delete Task?</h3>
            <p className="mb-6 text-gray-700 text-center">Are you sure you want to delete this task? This action cannot be undone.</p>
            <div className="flex gap-4">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition font-medium shadow"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition font-medium shadow"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}