// server.js
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Mock data
const mockEvents = [
  { _id: '1', name: 'Summer Festival', description: 'Annual music festival', date: '2024-07-15', location: { name : "New York" , address : {
    "type" : "Point",
    "coordinates" : [-73.935242, 40.73061]
  } } },
  { _id: '2', name: 'Tech Conference', description: 'Latest in tech innovations', date: '2024-09-20', location: {
    "name" : "New York",
    "address" : {
      "type" : "Point",
      "coordinates" : [-73.955242, 40.75061]
  } },
  "startTime" : "10:00",
  "endTime" : "18:00",
  "useAttendeeList" : true,
  "attendees" : ["Alice", "Bob"],
  "maxAttendees" : 100},
  { _id: '3', name: 'Food Fair', description: 'Taste cuisines from around the world', date: '2024-08-05', location:{
    "name" : "San Francisco",
    "address" : {
      "type" : "Point",
      "coordinates" : [-122.4192363, 37.7749295]
  }},
  "paymentRequired" : true,
  "paymentAmount" : 20,
  "paymentDueDate" : "2024-07-15"},
  { _id: '4', name: 'Music Awards', description: 'Music awards show', date: '2024-11-10', location: {
    "name" : "San Francisco",
    "address" : {
      "type" : "Point",
      "coordinates" : [-122.4192363, 37.7749295]
  }}},
    { _id: '5', name: 'Film Festival', description: 'Celebrating independent films', date: '2024-10-30', location: {
        "name" : "New York",
        "address" : {
        "type" : "Point",
        "coordinates" : [-73.935242, 40.73061],
       
    }},
    "attendees" : ["John", "Jane"],
    "maxAttendees" : 1000,
    "startTime" : "10:00",
    "useAttendeeList" : true,},
    {
        _id: '6', name: 'Wine Tasting', description: 'Sample wines from around the world', date: '2024-06-20', location: {
            "name" : "San Francisco",
            "address" : {
            "type" : "Point",
            "coordinates" : [-122.4192363, 37.7749295]
        }}
    
    }
];

// Get all events
app.get('/api/events', (req, res) => {
  // TODO: Serve from MongoDB
  console.log('TODO: Replace with MongoDB query to fetch all events');
  console.log(mockEvents)
  res.json(mockEvents);
});

// Get a single event
app.get('/api/events/:id', (req, res) => {
  // TODO: Serve from MongoDB
  console.log('TODO: Replace with MongoDB query to fetch a single event');
  const event = mockEvents.find(e => e._id === req.params.id);
  if (event) {
    res.json(event);
  } else {
    res.status(404).json({ message: 'Event not found' });
  }
});

// Create a new event
app.post('/api/events', (req, res) => {
  // TODO: Save to MongoDB
  console.log('TODO: Replace with MongoDB insert operation');
  const insertedId = Date.now().toString();
  const newEvent = { ...req.body, _id: insertedId };
  mockEvents.push(newEvent);
  res.status(201).json({"insertedId" : insertedId});
});

// Update an event
app.put('/api/events/:id', (req, res) => {
  // TODO: Update in MongoDB
  console.log('TODO: Replace with MongoDB update operation');
  const index = mockEvents.findIndex(e => e._id === req.params.id);
  if (index !== -1) {
    mockEvents[index] = { ...mockEvents[index], ...req.body };
    res.json(mockEvents[index]);
  } else {
    res.status(404).json({ message: 'Event not found' });
  }
});

// Delete an event
app.delete('/api/events/:id', (req, res) => {
  // TODO: Delete from MongoDB
  console.log('TODO: Replace with MongoDB delete operation');
  console.log(req.params.id)
  const index = mockEvents.findIndex(e => e._id === req.params.id);
  if (index !== -1) {
    mockEvents.splice(index, 1);
    res.status(204).end();
  } else {
    res.status(404).json({ message: 'Event not found' });
  }
});

// Search events
app.get('/api/events/search/:query', (req, res) => {
  // TODO: Implement MongoDB text search
  console.log('TODO: Replace with MongoDB text search');
  const { query } = req.params;
  console.log('Searching for:', query);
  const results = mockEvents.filter(event => 
    event.name.toLowerCase().includes(query.toLowerCase()) || 
    event.description.toLowerCase().includes(query.toLowerCase())
  );
  console.log('Results:', results);
  res.json(results);
});

// Search events by location
app.get('/api/search/location', (req, res) => {
    // TODO: Implement MongoDB location search
    console.log('TODO: Replace with MongoDB location search');
    console.log(req.query)
    const query = JSON.parse(req.query.query);
    console.log('Searching for:', query.name);

    const results = mockEvents.filter(event => 
        
      event.location.name.toLowerCase().includes(query.name.toLowerCase())
    );

    res.json(results);
});

    




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));