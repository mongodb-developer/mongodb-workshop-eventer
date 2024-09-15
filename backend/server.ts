import express from 'express';
import cors from 'cors';
import { Event } from './types';
import { v4 as uuidv4 } from 'uuid';

const app = express();
const port = 5000;

const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE']
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.json());

// In-memory storage
let events: Event[] = [
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

// Routes
app.get('/api/events', (req, res) => {
  res.json(events);
});

app.post('/api/events', (req, res) => {
  const newEvent: Event = {
    _id: uuidv4(),
    ...req.body
  };
  events.push(newEvent);
  res.status(201).json(newEvent);
});

app.put('/api/events/:id', (req, res) => {
  const { id } = req.params;
  const updatedEvent = req.body;
  const index = events.findIndex(e => e._id === id);
  if (index !== -1) {
    events[index] = { ...events[index], ...updatedEvent };
    res.json(events[index]);
  } else {
    res.status(404).json({ message: 'Event not found' });
  }
});

app.delete('/api/events/:id', (req, res) => {
  const { id } = req.params;
  events = events.filter(e => e._id !== id);
  res.status(204).send();
});

app.get('/api/events/search/:query', (req, res) => {
  const { query } = req.params;
  const filteredEvents = events.filter(e => 
    e.name.toLowerCase().includes(query.toLowerCase()) ||
    e.description.toLowerCase().includes(query.toLowerCase())
  );
  res.json(filteredEvents);
});

app.get('/api/search/location', (req, res) => {
  const { query } = req.query;
  if (typeof query !== 'string') {
    return res.status(400).json({ message: 'Invalid query parameter' });
  }
  const parsedQuery = JSON.parse(query);
  const filteredEvents = events.filter(e => 
    e.location.name === parsedQuery.name &&
    e.location.address.coordinates[0] === parsedQuery.address.coordinates[0] &&
    e.location.address.coordinates[1] === parsedQuery.address.coordinates[1]
  );
  res.json(filteredEvents);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});