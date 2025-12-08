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

// ==============================
// CHECK IF USER IS ALREADY LOGGED IN
// ==============================
window.addEventListener('load', () => {
    const currentUser = localStorage.getItem('buzzify_current_user');
    if (currentUser) {
        // User already logged in
        showApp();
    }
});

// ==============================
// SHOW APP FUNCTION
// ==============================
function showApp() {
    loginScreen.style.display = 'none';
    appScreen.style.display = 'block';
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
        bio: "",
        posts: []
    };

    localStorage.setItem('buzzify_users', JSON.stringify(users));
    localStorage.setItem('buzzify_current_user', username);

    alert('Sign-up successful! Logging you in...');
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

    // Login successful
    localStorage.setItem('buzzify_current_user', username);
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
// OPTIONAL: EXAMPLE INTERACTIONS
// ==============================
// Like button example
document.querySelectorAll('.video-post .post-actions button').forEach(button => {
    button.addEventListener('click', (e) => {
        if (button.textContent.includes('Like')) {
            button.textContent = '❤️ Liked';
        }
    });
});
