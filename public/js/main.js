let flyData = []; // Declare flyData at the top of your script
let editingFlyIndex = null

async function fetchFlies(sortBy) {
    const searchQuery = document.getElementById('searchInput').value; // Отримайте значення з поля пошуку
    const url = `http://localhost:3000/api/flies?sortBy=${sortBy || ''}&search=${encodeURIComponent(searchQuery)}`; // Додайте search до URL
    fetch(url)
        .then(response => response.json())
        .then(data => {
            renderFlies(data);
        })
        .catch(error => {
            console.error('Error fetching flies:', error);
        });
}


function editFly(id) {
    const fly = flyData.find(f => f.id === id); // Access flyData to find the fly
    if (fly) {
        document.getElementById('flyName').value = fly.name;
        document.getElementById('flySpeed').value = fly.speed;
        document.getElementById('flyMass').value = fly.mass;
        document.getElementById('flyImage').value = fly.image;

        editingFlyIndex = fly.id; // Set the id of the fly being edited
        showCreateForm(); // Show the modal
    }
}

async function searchFlies() {
    const searchQuery = document.getElementById('searchInput').value;
    const url = `http://localhost:3000/api/flies?search=${encodeURIComponent(searchQuery)}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const flies = await response.json();
        renderFlies(flies);
    } catch (error) {
        console.error('Error searching flies:', error);
    }
}


async function deleteFly(id) {
    try {
        const response = await fetch(`http://localhost:3000/api/flies/${id}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            fetchFlies(); // Refresh the list after deletion
        } else {
            console.error('Error deleting fly:', response.statusText);
        }
    } catch (error) {
        console.error('Error deleting fly:', error);
    }
}

function renderFlies(flies) {
    const flyList = document.getElementById('flies__content');
    flyList.innerHTML = '';
    let totalMass = 0;

    flies.forEach(fly => {
        const flyItem = document.createElement('div');
        flyItem.classList.add('fly-item');
        flyItem.innerHTML = `
            <img src="${fly.image}" alt="${fly.name}" width="200">
            <p>Назва: ${fly.name}</p>
            <p>Швидкість: ${fly.speed}</p>
            <p>Маса: ${fly.mass}</p>
            <button onclick="editFly(${fly.id})">Edit</button>
            <button onclick="deleteFly(${fly.id})">Delete</button>
        `;
        flyList.appendChild(flyItem);
        totalMass += fly.mass;
    });

    document.getElementById('totalMass').textContent = totalMass.toFixed(2);
}

function showCreateForm() {
    document.getElementById('flyForm').reset(); // Clear any previous input
    document.getElementById('flyModal').style.display = 'block'; // Show the modal
}

function hideFlyForm() {
    document.getElementById('flyModal').style.display = 'none'; // Hide the modal
}

document.getElementById('saveButton').addEventListener('click', saveFly);

async function saveFly(event) {
    event.preventDefault(); // Prevent the default form submission
    const name = document.getElementById('flyName').value;
    const speed = parseFloat(document.getElementById('flySpeed').value);
    const mass = parseFloat(document.getElementById('flyMass').value);
    const image = document.getElementById('flyImage').value;

    if (!name || speed <= 0 || mass <= 0 || !image) {
        alert('Будь-ласка заповніть таблицю валідними даними');
        return;
    }

    const newFly = { name, speed, mass, image };

    // Check if we're editing or creating a fly
    if (editingFlyIndex !== null) {
        // Update an existing fly
        const response = await fetch(`http://localhost:3000/api/flies/${editingFlyIndex}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newFly),
        });

        if (response.ok) {
            fetchFlies(); // Refresh the list
            hideFlyForm(); // Close the form
        }
    } else {
        // Create a new fly
        const response = await fetch('http://localhost:3000/api/flies', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newFly),
        });

        if (response.ok) {
            fetchFlies(); // Refresh the list
            hideFlyForm(); // Close the form
        } else {
            console.error('Error creating fly:', response.statusText);
        }
    }
}

fetchFlies();
