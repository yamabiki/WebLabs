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
    new Fly('Hornet', 2,0.5, './img/hornet.png'),
    new Fly('Dragon Fly', 3, 0.7, './img/dragonfly.png'),
];

let filteredFlies = flyData;

function renderFlies(flies) {
    filteredFlies = flies;
    const flyList = document.getElementById('flies__content');
    flyList.innerHTML = '';

    flies.forEach(fly => {
        const alcoholItem = document.createElement('div');
        alcoholItem.classList.add('fly-item');
        alcoholItem.innerHTML = `
                    <img src="${fly.image}" ${fly.name}" width="200">
                    <p>Назва: ${fly.name}</p>
                    <p>Швидкість: ${fly.speed}</p>
                    <p>Маса: ${fly.mass}</p>
                `;
        flyList.appendChild(alcoholItem);
    });

}


function sortByAlphabet() {
    const sortedFlies = [...filteredFlies].sort((a, b) => a.name.localeCompare(b.name)); // Reversed
    renderFlies(sortedFlies);
}

function sortBySpeed() {
    const sortedFlies = [...filteredFlies].sort((a, b) => b.speed - a.speed); // Reversed
    renderFlies(sortedFlies);
}

function sortByMass() {
    const sortedFlies = [...filteredFlies].sort((a, b) => b.mass - a.mass); // Reversed
    renderFlies(sortedFlies);
}

function searchFlyByName() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const filteredFlies = flyData.filter(fly => fly.name.toLowerCase().includes(searchInput));
    renderFlies(filteredFlies);
}

renderFlies(filteredFlies);