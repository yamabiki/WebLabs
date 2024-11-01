const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Sample data
let flyData = [
    { id: 1, name: 'Common Fly', speed: 1, mass: 1, image: './img/fly.png' },
    { id: 2, name: 'Hornet', speed: 2, mass: 0.5, image: './img/hornet.png' },
    { id: 3, name: 'Dragon Fly', speed: 3, mass: 0.7, image: './img/dragonfly.png' },
];

app.use(express.json());
app.use(cors());

app.get('/api/flies', (req, res) => {
    const searchQuery = req.query.search?.toLowerCase();
    const sortBy = req.query.sortBy;

    // Filter flies based on the search query
    let filteredFlies = searchQuery
        ? flyData.filter(fly => fly.name.toLowerCase().includes(searchQuery))
        : flyData;

    // Sort the filtered flies based on the selected criteria
    switch (sortBy) {
        case 'alphabet':
            filteredFlies.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'speed':
            filteredFlies.sort((a, b) => a.speed - b.speed);
            break;
        case 'mass':
            filteredFlies.sort((a, b) => a.mass - b.mass);
            break;
        default:
            // No sorting applied if sortBy is not recognized
            break;
    }

    res.json(filteredFlies);
});




// POST to create a new fly
app.post('/api/flies', (req, res) => {
    const { name, speed, mass, image } = req.body;
    const newFly = { id: flyData.length + 1, name, speed, mass, image };
    flyData.push(newFly);
    res.status(201).json(flyData);
});

// PUT to edit an existing fly
app.put('/api/flies/:id', (req, res) => {
    const { id } = req.params;
    const { name, speed, mass, image } = req.body;
    const flyIndex = flyData.findIndex(fly => fly.id == id);

    if (flyIndex !== -1) {
        flyData[flyIndex] = { id: Number(id), name, speed, mass, image };
        res.json(flyData);
    } else {
        res.status(404).json({ error: 'Fly not found' });
    }
});

// DELETE to remove a fly
app.delete('/api/flies/:id', (req, res) => {
    const { id } = req.params;
    flyData = flyData.filter(fly => fly.id != id);
    res.json(flyData);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
