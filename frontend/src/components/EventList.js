import React from 'react';
import EventItem from './EventItem';

function EventList({ events, onDelete, onEdit }) {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold text-mongodb-dark-gray mb-4">Events</h2>
      <div className="space-y-4">
        {events.map(event => (
          <EventItem 
            key={event.id} 
            event={event} 
            onDelete={onDelete} 
            onEdit={onEdit} 
          />
        ))}
      </div>
    </div>
  );
}

export default EventList;