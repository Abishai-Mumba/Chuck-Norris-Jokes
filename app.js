const filterDiv = document.querySelector('.filter');
const refreshBtn = document.querySelector('.refresh');
const displayDiv = document.querySelector('.jokes');
let selectedFilter = 'all';
let prevSelectedBtn = document.querySelector('button[data-filter = all');
const colors = ['#f3f169', '#fccde2', '#a7ff83', '#ffcdab', '#ace7ef'];

const getJokes =  async (category) => {
    try {
        displayDiv.innerHTML = `<div class="loader"></div>`;
        const url = `https://api.chucknorris.io/jokes/random?${category === 'all' ? '' : 'category='}${category === 'all' ? '' : category}`;
        const response = await fetch(url);
        const data = await response.json();
        render(data);
    } catch(error) {
        console.log('Oooops!', error);
        displayDiv.innerHTML = `Oooops! something went wrong`;
    }
};

const randomColor = (colors) => {
    const randomNum = Math.floor(Math.random() * colors.length);
    return colors[randomNum];
};

const render = joke => {
    displayDiv.innerHTML = 
    `<div class="card" style="background-color: ${randomColor(colors)};">
        <img src="${joke.icon_url}" alt="chuck norris avatar">
        <p class="joke">${joke.value}</p>
    </div>`;
};

const removePrevSelectedBtnSyle = prevSelectedBtn => {
    prevSelectedBtn.classList.remove('clicked');
};

const filterContent = e => {
    if (e.target.tagName != 'BUTTON') {
        return;
    }
    const category = e.target.dataset.filter;
    if (selectedFilter === category) {
        return;
    }
    selectedFilter = category;
    getJokes(category);
    e.target.classList.add('clicked');
    removePrevSelectedBtnSyle(prevSelectedBtn);
    prevSelectedBtn = e.target;
};

const refreshJoke = () => {
    getJokes(selectedFilter);
};

getJokes(selectedFilter);
refreshBtn.addEventListener('click', refreshJoke);
filterDiv.addEventListener('click', filterContent);