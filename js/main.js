class Fly {
    constructor(name, speed, mass, image) {
        this.name = name;
        this.speed = speed;
        this.mass = mass;
        this.image = image;
    }
}

const flyData = [
    new Fly('Common Fly', 1, 1, './img/fly.png'),
    new Fly('Hornet', 2, 0.5, './img/hornet.png'),
    new Fly('Dragon Fly', 3, 0.7, './img/dragonfly.png'),
];

let filteredFlies = flyData;
let editingFlyIndex = null;

function renderFlies(flies) {
    filteredFlies = flies;
    const flyList = document.getElementById('flies__content');
    flyList.innerHTML = '';

    let totalMass = 0;

    flies.forEach((fly, index) => {
        const flyItem = document.createElement('div');
        flyItem.classList.add('fly-item');
        flyItem.innerHTML = `
            <img src="${fly.image}" alt="${fly.name}" width="200">
            <p>Назва: ${fly.name}</p>
            <p>Швидкість: ${fly.speed}</p>
            <p>Маса: ${fly.mass}</p>
            <button onclick="editFly(${index})">Edit</button>
        `;
        flyList.appendChild(flyItem);

        totalMass += fly.mass;
    });

    // Display total mass
    document.getElementById('totalMass').textContent = totalMass.toFixed(2);
}

function sortByAlphabet() {
    const sortedFlies = [...filteredFlies].sort((a, b) => a.name.localeCompare(b.name));
    renderFlies(sortedFlies);
}

function sortBySpeed() {
    const sortedFlies = [...filteredFlies].sort((a, b) => b.speed - a.speed);
    renderFlies(sortedFlies);
}

function sortByMass() {
    const sortedFlies = [...filteredFlies].sort((a, b) => b.mass - a.mass);
    renderFlies(sortedFlies);
}

function searchFlyByName() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const filteredFlies = flyData.filter(fly => fly.name.toLowerCase().includes(searchInput));
    renderFlies(filteredFlies);
}

function showCreateForm() {
    document.getElementById('formTitle').textContent = 'Створити Комаху';
    document.getElementById('flyForm').reset();
    editingFlyIndex = null;  // Reset edit index
    document.getElementById('flyModal').style.display = 'block'; // Show modal
}

function editFly(index) {
    const fly = flyData[index];
    document.getElementById('formTitle').textContent = 'Відредагувати Комаху';
    document.getElementById('flyName').value = fly.name;
    document.getElementById('flySpeed').value = fly.speed;
    document.getElementById('flyMass').value = fly.mass;
    document.getElementById('flyImage').value = fly.image;
    editingFlyIndex = index;  // Set edit index
    document.getElementById('flyModal').style.display = 'block';
}

function saveFly(event) {
    event.preventDefault(); // Prevent form submission
    const name = document.getElementById('flyName').value;
    const speed = parseFloat(document.getElementById('flySpeed').value);
    const mass = parseFloat(document.getElementById('flyMass').value);
    const image = document.getElementById('flyImage').value;

    if (!name || speed <= 0 || mass <= 0 || !image) {
        alert('Please fill all fields with valid data.');
        return;
    }

    const fly = new Fly(name, speed, mass, image);

    if (editingFlyIndex !== null) {
        // Update existing fly
        flyData[editingFlyIndex] = fly;
    } else {
        // Add new fly
        flyData.push(fly);
    }

    hideFlyForm();
    renderFlies(flyData);
}

function hideFlyForm() {
    document.getElementById('flyModal').style.display = 'none';
}

renderFlies(filteredFlies);
