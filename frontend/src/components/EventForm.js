import React, { useState, useEffect } from 'react';

function EventForm({ onSubmit, initialEvent = null }) {
  const [eventData, setEventData] = useState({
    name: '',
    description: '',
    date: '',
    location: locations[0]
    
  });

  locations = [
    {
        "name": "San Francisco",
        "address": {
            "type": "Point",
            "coordinates": [-122.4194, 37.7749]
            }
    },
    {
        "name": "New York",
        "address": {
            "type": "Point",
            "coordinates": [-74.006, 40.7128]
            }
    }]

  useEffect(() => {
    if (initialEvent) {
      setEventData(initialEvent);
    }
  }, [initialEvent]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(eventData);
    setEventData({ name: '', description: '', date: '', location: locations[0] });
  };

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Event Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={eventData.name}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-mongodb-green focus:ring focus:ring-mongodb-green focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          name="description"
          id="description"
          value={eventData.description}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-mongodb-green focus:ring focus:ring-mongodb-green focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
        <input
          type="date"
          name="date"
          id="date"
          value={eventData.date}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-mongodb-green focus:ring focus:ring-mongodb-green focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
        {/* <input
          type="text"
          name="location"
          id="location"
          value={eventData.location.name}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-mongodb-green focus:ring focus:ring-mongodb-green focus:ring-opacity-50"
        /> */}
        <select
            name="location"
            id="location"
            value={eventData.location.name}
            onChange={() => {
                fullLocation = locations.find(location => location.name === e.target.value);
                handleChange({ target: { name: 'location', value: fullLocation } });
                
            }}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-mongodb-green focus:ring focus:ring-mongodb-green focus:ring-opacity-50"
            >
            <option value='San Francisco'>San Francisco</option>
          <option value='New York'>New York</option>
        </select>
      </div>
      <button 
        type="submit" 
        className="w-full bg-mongodb-green hover:bg-mongodb-dark-green text-white font-bold py-2 px-4 rounded"
      >
        {initialEvent ? 'Update Event' : 'Add Event'}
      </button>
    </form>
  );
}

export default EventForm;