// ==============================
// ELEMENTS
// ==============================
const loginScreen = document.getElementById('login-screen');
const appScreen = document.getElementById('app');

const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');

const loginUsername = document.getElementById('login-username');
const loginPassword = document.getElementById('login-password');

const signupUsername = document.getElementById('signup-username');
const signupPassword = document.getElementById('signup-password');

// App sections
const feedContainer = document.querySelector('.feed-container');
const profileContainer = document.querySelector('.profile-container');
const marketplaceContainer = document.querySelector('.marketplace-container');
const chatContainer = document.querySelector('.chat-container');

// Navbar items
const navbarItems = document.querySelectorAll('.navbar .nav-item');

// ==============================
// SHOW APP FUNCTION
// ==============================
function showApp() {
    loginScreen.style.display = 'none';
    appScreen.style.display = 'block';
    showSection('Home'); // Default to Home
}

// ==============================
// SIGNUP FUNCTIONALITY
// ==============================
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const username = signupUsername.value.trim();
    const password = signupPassword.value.trim();
    
    if (!username || !password) {
        alert('Please enter username and password.');
        return;
    }

    // Get saved users from localStorage
    let users = JSON.parse(localStorage.getItem('buzzify_users')) || {};

    if (users[username]) {
        alert('Username already exists! Please choose another.');
        return;
    }

    // Save new user
    users[username] = {
        password: password,
        followers: 0,
        following: 0,
        likes: 0,
        bio: "This is your bio!",
        posts: []
    };

    localStorage.setItem('buzzify_users', JSON.stringify(users));
    localStorage.setItem('buzzify_current_user', username);

    alert('Sign-up successful! Logging you in...');
    updateProfile();
    showApp();
});

// ==============================
// LOGIN FUNCTIONALITY
// ==============================
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const username = loginUsername.value.trim();
    const password = loginPassword.value.trim();

    const users = JSON.parse(localStorage.getItem('buzzify_users')) || {};

    if (!users[username]) {
        alert('Username does not exist.');
        return;
    }

    if (users[username].password !== password) {
        alert('Incorrect password.');
        return;
    }

    localStorage.setItem('buzzify_current_user', username);
    updateProfile();
    showApp();
});

// ==============================
// LOGOUT FUNCTIONALITY
// ==============================
function logout() {
    localStorage.removeItem('buzzify_current_user');
    loginScreen.style.display = 'flex';
    appScreen.style.display = 'none';
}

// ==============================
// NAVIGATION FUNCTIONALITY
// ==============================
function showSection(section) {
    // Hide all sections
    feedContainer.style.display = 'none';
    profileContainer.style.display = 'none';
    marketplaceContainer.style.display = 'none';
    chatContainer.style.display = 'none';

    // Remove active class from all navbar items
    navbarItems.forEach(item => item.classList.remove('active'));

    // Show selected section
    switch (section) {
        case 'Home':
            feedContainer.style.display = 'block';
            navbarItems[0].classList.add('active');
            break;
        case 'Explore':
            // For now Explore = Marketplace
            marketplaceContainer.style.display = 'block';
            navbarItems[1].classList.add('active');
            break;
        case 'Chat':
            chatContainer.style.display = 'block';
            navbarItems[2].classList.add('active');
            break;
        case 'Marketplace':
            marketplaceContainer.style.display = 'block';
            navbarItems[3].classList.add('active');
            break;
        case 'Profile':
            profileContainer.style.display = 'block';
            navbarItems[4].classList.add('active');
            break;
    }
}

// Add click events to navbar
navbarItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        switch (index) {
            case 0: showSection('Home'); break;
            case 1: showSection('Explore'); break;
            case 2: showSection('Chat'); break;
            case 3: showSection('Marketplace'); break;
            case 4: showSection('Profile'); break;
        }
    });
});

// ==============================
// UPDATE PROFILE INFO
// ==============================
function updateProfile() {
    const currentUser = localStorage.getItem('buzzify_current_user');
    if (!currentUser) return;

    const users = JSON.parse(localStorage.getItem('buzzify_users')) || {};
    const user = users[currentUser];

    // Update profile section
    profileContainer.querySelector('.profile-name').textContent = currentUser;
    profileContainer.querySelector('.profile-bio').textContent = user.bio;
    profileContainer.querySelector('.profile-stats').innerHTML = `
        <div>Followers: ${user.followers}</div>
        <div>Following: ${user.following}</div>
        <div>Likes: ${user.likes}</div>
    `;
}

// ==============================
// INITIALIZE
// ==============================
window.addEventListener('load', () => {
    const currentUser = localStorage.getItem('buzzify_current_user');
    if (currentUser) {
        updateProfile();
        showApp();
    }
});
