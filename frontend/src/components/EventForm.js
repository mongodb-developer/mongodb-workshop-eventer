import React, { useState, useEffect } from 'react';

const locations = [
  {
    name: 'San Francisco',
    address: {
      type: 'Point',
      coordinates: [-122.4194, 37.7749],
    },
  },
  {
    name: 'New York',
    address: {
      type: 'Point',
      coordinates: [-74.006, 40.7128],
    },
  },
];

function EventForm({ onSubmit, initialEvent = null }) {
  const [eventData, setEventData] = useState({
    name: '',
    description: '',
    date: '',
    location: locations[0],
    startTime: '',
    endTime: '',
    useAttendeeList: false,
    attendees: null,
    maxAttendees: 0,
    paymentRequired: false,
    paymentAmount: 0,
    paymentDueDate: '',
  });

  useEffect(() => {
    if (initialEvent) {
      setEventData(initialEvent);
    }
  }, [initialEvent]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(eventData);
    setEventData({
      name: '',
      description: '',
      date: '',
      location: locations[0],
      startTime: '',
      endTime: '',
      useAttendeeList: false,
      attendees: null,
      maxAttendees: 0,
      paymentRequired: false,
      paymentAmount: 0,
      paymentDueDate: '',
    });
  };

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleAttendeeListChange = (e) => {
    setEventData({ 
      ...eventData, 
      useAttendeeList: e.target.checked,
      attendees: e.target.checked ? [] : null
    });
  };

  const handlePaymentRequirementChange = (e) => {
    setEventData({ ...eventData, paymentRequired: e.target.checked });
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
        <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">Start Time</label>
        <input
          type="time"
          name="startTime"
          id="startTime"
          value={eventData.startTime}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-mongodb-green focus:ring focus:ring-mongodb-green focus:ring-opacity-50"
        />
      </div>

      <div>
        <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">End Time</label>
        <input
          type="time"
          name="endTime"
          id="endTime"
          value={eventData.endTime}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-mongodb-green focus:ring focus:ring-mongodb-green focus:ring-opacity-50"
        />
      </div>

      <div>
        <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
        <select
          name="location"
          id="location"
          value={eventData.location.name}
          onChange={(e) => {
            const fullLocation = locations.find((location) => location.name === e.target.value);
            handleChange({ target: { name: 'location', value: fullLocation } });
          }}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-mongodb-green focus:ring focus:ring-mongodb-green focus:ring-opacity-50"
        >
          {locations.map((location) => (
            <option key={location.name} value={location.name}>
              {location.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="useAttendeeList" className="block text-sm font-medium text-gray-700">
          Use Attendee List
        </label>
        <div className="mt-1">
          <input
            type="checkbox"
            name="useAttendeeList"
            id="useAttendeeList"
            checked={eventData.useAttendeeList}
            onChange={handleAttendeeListChange}
            className="focus:ring-mongodb-green h-4 w-4 text-mongodb-green border-gray-300 rounded"
          />
        </div>
      </div>
      
      {eventData.useAttendeeList && (
        <div>
          <label htmlFor="maxAttendees" className="block text-sm font-medium text-gray-700">
            Maximum Attendees
          </label>
          <input
            type="number"
            name="maxAttendees"
            id="maxAttendees"
            value={eventData.maxAttendees}
            onChange={handleChange}
            min="0"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-mongodb-green focus:ring focus:ring-mongodb-green focus:ring-opacity-50"
          />
        </div>
      )}

      <div>
        <label htmlFor="paymentRequired" className="block text-sm font-medium text-gray-700">
          Payment Required
        </label>
        <div className="mt-1">
          <input
            type="checkbox"
            name="paymentRequired"
            id="paymentRequired"
            checked={eventData.paymentRequired}
            onChange={handlePaymentRequirementChange}
            className="focus:ring-mongodb-green h-4 w-4 text-mongodb-green border-gray-300 rounded"
          />
        </div>
      </div>

      {eventData.paymentRequired && (
        <>
          <div>
            <label htmlFor="paymentAmount" className="block text-sm font-medium text-gray-700">
              Payment Amount
            </label>
            <input
              type="number"
              name="paymentAmount"
              id="paymentAmount"
              value={eventData.paymentAmount}
              onChange={handleChange}
              min="0"
              step="0.01"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-mongodb-green focus:ring focus:ring-mongodb-green focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="paymentDueDate" className="block text-sm font-medium text-gray-700">
              Payment Due Date
            </label>
            <input
              type="date"
              name="paymentDueDate"
              id="paymentDueDate"
              value={eventData.paymentDueDate}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-mongodb-green focus:ring focus:ring-mongodb-green focus:ring-opacity-50"
            />
          </div>
        </>
      )}

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