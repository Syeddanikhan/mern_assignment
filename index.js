const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

let employees = [];
let lastId = 0;

app.post('/api/employees', (req, res) => {
  const { name, position, department } = req.body;

  if (!name || !position || !department || 
      name.trim() === '' || position.trim() === '' || department.trim() === '') {
    return res.status(400).json({ message: 'All fields (name, position, department) are required and cannot be empty' });
  }

  lastId++;
  const employee = {
    id: lastId.toString(),
    name: name.trim(),
    position: position.trim(),
    department: department.trim()
  };
  employees.push(employee);
  res.status(201).json(employee);
});

app.get('/api/employees', (req, res) => {
  res.json(employees);
});

app.get('/api/employees/:id', (req, res) => {
  const id = req.params.id;
  if (!id || id.trim() === '') {
    return res.status(400).json({ message: 'ID is required' });
  }

  const employee = employees.find(emp => emp.id === id);
  if (employee) {
    res.json(employee);
  } else {
    res.status(404).json({ message: 'Employee not found' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});