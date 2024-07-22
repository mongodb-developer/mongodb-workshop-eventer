import React, { useState, useEffect } from 'react';
import EventList from './components/EventList';
import EventForm from './components/EventForm';
import SearchBar from './components/SearchBar';
import axios from 'axios';


function App() {
  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);

  useEffect(() => {
    getAllEvents();
  }, []);

  const getAllEvents = async () => {
    const { data } = await axios.get('http://localhost:5000/api/events');
    setEvents(data);
  };

  const addEvent = async (newEvent) => {
    //setEvents([...events, { ...newEvent, _id: Date.now().toString() }]);
    console.log(newEvent)
    // newEvent.location = JSON.parse(newEvent.location);
    const insertedDoc = await axios.post('http://localhost:5000/api/events', newEvent);
    setEvents([...events, { ...newEvent, _id: insertedDoc.data.insertedId }]);
  };

  


  const updateEvent = async (updatedEvent) => {
    //setEvents(events.map(event => event._id === updatedEvent._id ? updatedEvent : event));
    const newEvent = await axios.put(`http://localhost:5000/api/events/${updatedEvent._id}`, updatedEvent);
     
    setEvents(events.map(event => event._id === updatedEvent._id ? newEvent.data : event));
    setEditingEvent(null);
  };

  const deleteEvent = async(id) => {
    await axios.delete(`http://localhost:5000/api/events/${id}`);
    getAllEvents();
  };

  const searchEvents = async (query) => {
    if (query === '') {
      getAllEvents();
      return;
    }

    const filteredEvents = await axios.get(`http://localhost:5000/api/events/search/${query}`);
    setEvents(filteredEvents.data);
  };

  const searchLocation = async (event) => {

    const query = event.target.value;
    if (query === '')
      getAllEvents();
    else {
      const filteredEvents = await axios.get(`http://localhost:5000/api/search/location?query=${query}`);
      setEvents(filteredEvents.data);
    }
    

    
    
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-mongodb-dark-gray mb-6">Eventer 📆</h1>
        <SearchBar onSearch={searchEvents} type="text" />
        {/* <SearchBar onSearch={searchLocation} type="location" /> */}
        <select className="mt-6" name="location" id="location" onChange={searchLocation}>
          <option value="">All</option>
          <option value='{
            "name": "San Francisco",
            "address": {
              "type": "Point",
              "coordinates": [-122.4194, 37.7749]
            }
          }'>San Francisco</option>
          <option value='{
            "name": "New York",
            "address": {
              "type": "Point",
              "coordinates": [-74.006, 40.7128]
            }
          }'>New York</option>
  
          </select>

          <details className="mt-6 bg-white shadow-md rounded-lg overflow-hidden">
          <summary className="text-lg font-semibold text-mongodb-dark-gray bg-gray-50 px-4 py-3 cursor-pointer hover:bg-gray-100 transition-colors duration-200 flex justify-between items-center">
            <span>Add/Edit Event</span>
            <svg className="w-5 h-5 transform transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </summary>
          <div className="p-4">
            <EventForm 
              onSubmit={editingEvent ? updateEvent : addEvent} 
              initialEvent={editingEvent} 
            />
          </div>
        </details>
        <EventList 
          events={events} 
          onDelete={deleteEvent} 
          onEdit={setEditingEvent}
          onRegisterUser={updateEvent}
        />
      </div>
    </div>
  );
}

export default App;

