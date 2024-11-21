const express = require('express');
const cors = require('cors');
const path = require("node:path");
const app = express();
const port = process.env.PORT || 5001;

app.use(express.json());
app.use(cors());
app.use('/images', express.static(path.join(__dirname, 'images')));

const catalogItems = [
    { id: 1, title: 'Regular Fly', description: 'A regular fly', price: 100, category: 'Fly', image: '/images/bug1.png' },
    { id: 2, title: 'A wasp', description: 'Ooh, a dangerous and mean one!', price: 200, category: 'Wasp', image: '/images/bug2.png' },
    { id: 3, title: 'A weird bug!', description: 'Thats a burger... again', price: 499, category: 'Bug', image: '/images/bug3.png' },
    { id: 4, title: 'A dude', description: 'What?', price: 2415, category: 'Other', image: '/images/bug4.png' },
    { id: 5, title: 'A dudah', description: 'What?', price: 2415, category: 'Other', image: '/images/bug4.png' },
];

// Функція для додавання повного URL до зображень
const addFullImageUrls = (items, req) => {
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    return items.map(item => ({
        ...item,
        image: `${baseUrl}${item.image}`, // Формуємо повний URL до зображення
    }));
};

app.get('/api/catalog', (req, res) => {
    const { search, priceRange, category } = req.query;

    const normalizeText = (text) => text.toLowerCase().replace(/[^a-z0-9]/g, '');

    let filteredItems = catalogItems;

    if (search) {
        filteredItems = filteredItems.filter((item) =>
            normalizeText(item.title).includes(normalizeText(search))
        );
    }

    if (priceRange) {
        const [min, max] = priceRange.includes('+')
            ? [parseInt(priceRange.replace('+', ''), 10), Infinity]
            : priceRange.split('-').map(Number);

        filteredItems = filteredItems.filter((item) => item.price >= min && item.price <= max);
    }

    if (category) {
        filteredItems = filteredItems.filter((item) =>
            item.category.toLowerCase() === category.toLowerCase()
        );
    }

    res.json(addFullImageUrls(filteredItems, req)); // Додаємо повні URL
});

app.get('/api/catalog/:id', (req, res) => {
    const { id } = req.params;
    const item = catalogItems.find((item) => item.id === parseInt(id, 10));

    if (item) {
        res.json({
            ...item,
            image: `${req.protocol}://${req.get('host')}${item.image}` // Додаємо повний URL
        });
    } else {
        res.status(404).json({ error: 'Item not found' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
