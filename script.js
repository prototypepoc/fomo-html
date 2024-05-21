const fakeUsers = [
    'Alice', 'Bob', 'Charlie', 'David', 'Eva',
    'Frank', 'Grace', 'Hank', 'Ivy', 'Jack'
];

const messages = [
    'just bought the same product!',
    'just placed an order for this item!',
    'recently purchased this!',
    'added this to their cart!',
    'just checked out with this!'
];

const locations = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'];

const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

const generateRandomMessage = () => {
    const user = getRandomElement(fakeUsers);
    const message = getRandomElement(messages);
    const location = getRandomElement(locations);
    return `${user} from ${location} ${message}`;
};

let quantity = 10;
let timeLeft = 60;
let isBought = JSON.parse(localStorage.getItem('isBought')) || false;

const fomoMessageElement = document.getElementById('fomo-message');
const quantityLeftElement = document.getElementById('quantity-left');
const timeLeftElement = document.getElementById('time-left');
const buyNowButton = document.getElementById('buy-now-button');
const fomoPopup = document.getElementById('fomo-popup');

const updateMessage = () => {
    fomoMessageElement.textContent = generateRandomMessage();
};

const updateTimer = () => {
    timeLeft--;
    if (timeLeft <= 0) {
        timeLeft = 0;
        clearInterval(timerInterval);
    }
    timeLeftElement.textContent = `Time left: ${timeLeft}s`;
};

const handleBuyNow = () => {
    if (!isBought) {
        isBought = true;
        quantity--;
        localStorage.setItem('isBought', true);
        quantityLeftElement.textContent = `${quantity} left`;
        clearInterval(messageInterval);
        clearInterval(timerInterval);
        fomoMessageElement.textContent = 'Thank you for your purchase!';
        timeLeftElement.textContent = '';
        buyNowButton.disabled = true;
        setTimeout(() => fomoPopup.classList.add('hidden'), 3000);
    }
};

if (!isBought) {
    fomoPopup.classList.remove('hidden');
    updateMessage();
    quantityLeftElement.textContent = `${quantity} left`;
    timeLeftElement.textContent = `Time left: ${timeLeft}s`;

    var messageInterval = setInterval(updateMessage, 3000);
    var timerInterval = setInterval(updateTimer, 1000);
} else {
    fomoPopup.classList.add('hidden');
}

buyNowButton.addEventListener('click', handleBuyNow);
