import React, { useState } from 'react';

function EventItem({ event, onDelete, onEdit, onRegister }) {
  const [newAttendeeName, setNewAttendeeName] = useState('');

  const handleAddAttendee = (e) => {
    e.preventDefault();
    if (newAttendeeName.trim()) {
      const updatedEvent = {
        ...event,
        attendees: [...(event.attendees || []), newAttendeeName.trim()]
      };
      onRegister(updatedEvent);
      setNewAttendeeName('');
    }
  };

  return (
    <div className="bg-gray-50 p-4 rounded-md shadow">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold text-mongodb-dark-gray">{event.name}</h3>
        {event.distance && (
          <span className="bg-mongodb-green text-white text-xs font-semibold px-2 py-1 rounded-full">
            {event.distance.toFixed(2)/1000} km
          </span>
        )}
      </div>
      <p className="text-gray-600 mt-1">{event.description}</p>
      <p className="text-gray-600 mt-1">Date: {event.date}</p>
      <p className="text-gray-600 mt-1">Time: {event.startTime} - {event.endTime}</p>
      <p className="text-gray-600 mt-1">Location: {event.location.name}</p>
      
      {event.paymentRequired && (
        <div className="mt-2">
          <p className="text-gray-600">
            <span className="font-semibold">Price:</span> ${event.paymentAmount}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Payment Due:</span> {event.paymentDueDate}
          </p>
        </div>
      )}
      
      {event.useAttendeeList && (
        <div className="mt-4">
          <h4 className="text-md font-semibold text-mongodb-dark-gray">Attendees:</h4>
          <p className="text-gray-600 mt-1">
            {event.attendees ? event.attendees.length : 0} / {event.maxAttendees} spots filled
          </p>
          <ul className="list-disc list-inside">
            {event.attendees && event.attendees.map((attendee, index) => (
              <li key={index} className="text-gray-600">{attendee}</li>
            ))}
          </ul>
          {event.attendees && event.attendees.length < event.maxAttendees && (
            <form onSubmit={handleAddAttendee} className="mt-2 flex">
              <input
                type="text"
                value={newAttendeeName}
                onChange={(e) => setNewAttendeeName(e.target.value)}
                placeholder="New attendee name"
                className="flex-grow p-2 border rounded-l"
              />
              <button 
                type="submit" 
                className="bg-mongodb-green hover:bg-mongodb-dark-green text-white font-bold py-2 px-4 rounded-r"
              >
                Add
              </button>
            </form>
          )}
          {event.attendees && event.attendees.length >= event.maxAttendees && (
            <p className="text-red-500 mt-2">This event is full.</p>
          )}
        </div>
      )}
      
      <div className="mt-4 space-x-2">
        <button 
          onClick={() => onEdit(event)} 
          className="bg-mongodb-green hover:bg-mongodb-dark-green text-white font-bold py-2 px-4 rounded"
        >
          Edit
        </button>
        <button 
          onClick={() => onDelete(event._id)} 
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default EventItem;