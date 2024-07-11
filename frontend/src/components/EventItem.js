import React from 'react';

function EventItem({ event, onDelete, onEdit }) {
  return (
    <div className="bg-gray-50 p-4 rounded-md shadow">
      <h3 className="text-lg font-semibold text-mongodb-dark-gray">{event.name}</h3>
      <p className="text-gray-600 mt-1">{event.description}</p>
      <p className="text-gray-600 mt-1">Date: {event.date}</p>
      <p className="text-gray-600 mt-1">Location: {event.location.name}</p>
      <div className="mt-4 space-x-2">
        <button 
          onClick={() => onEdit(event)} 
          className="bg-mongodb-green hover:bg-mongodb-dark-green text-white font-bold py-2 px-4 rounded"
        >
          Edit
        </button>
        <button 
          onClick={() => {console.log(event._id);onDelete(event._id)}} 
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default EventItem;