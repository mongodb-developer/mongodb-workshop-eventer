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
    newEvent.location = JSON.parse(newEvent.location);
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

          
        <EventForm 
          onSubmit={editingEvent ? updateEvent : addEvent} 
          initialEvent={editingEvent} 
        />
        <EventList 
          events={events} 
          onDelete={deleteEvent} 
          onEdit={setEditingEvent} 
        />
      </div>
    </div>
  );
}

export default App;