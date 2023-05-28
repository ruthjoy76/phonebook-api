const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3001;


app.use(cors());
app.use(express.json());
app.use(express.static('dist'));


let persons = [
  {
    "id": 1,
    "name": "Arto Hellas",
    "number": "040-123456"
  },

  {
    "id": 2,
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },

  {
    "id": 3,
    "name": "Dan Abramov",
    "number": "12-43-234345"
  }
];

function generateId() {
  const maxId = db.length > 0
    ? Math.max(...db.map(n => n.id))
    : 0;
  return maxId + 1;
};

app.get("/", (_request, response) => {
  response.send("<h1>Hello, WD56P!</h1>");
});

app.get('/api/persons', (_request, response) => {
  response.status(200).json(persons);
});

app.post('/api/persons', (request, response) => {
  const {name, number} = request.body;

  const person = {
  id: generateId(),
  name,
  number,
  };

  persons = persons.concat(person);
  response.status(201).json(person);

});

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter(person => person.id !== id);
  response.status(204).end();

});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})