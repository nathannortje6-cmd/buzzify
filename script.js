// ===== Local Storage Keys =====
const USERS_KEY = 'buzzify_users';
const POSTS_KEY = 'buzzify_posts';
const MARKET_KEY = 'buzzify_market';

// ===== Helper Functions =====
function getUsers() { return JSON.parse(localStorage.getItem(USERS_KEY)) || []; }
function saveUsers(users) { localStorage.setItem(USERS_KEY, JSON.stringify(users)); }
function getPosts() { return JSON.parse(localStorage.getItem(POSTS_KEY)) || []; }
function savePosts(posts) { localStorage.setItem(POSTS_KEY, JSON.stringify(posts)); }
function getMarketItems() { return JSON.parse(localStorage.getItem(MARKET_KEY)) || []; }
function saveMarketItems(items) { localStorage.setItem(MARKET_KEY, JSON.stringify(items)); }

// ===== Current User =====
let currentUser = null;

// ===== Screen Management =====
function showScreen(screenId) {
    const screens = document.querySelectorAll('.mainScreen');
    screens.forEach(s => s.classList.add('hidden'));
    document.getElementById(screenId).classList.remove('hidden');
}

// ===== Login / Signup =====
function login() {
    const username = document.getElementById('loginUser').value.trim();
    const password = document.getElementById('loginPass').value.trim();
    const users = getUsers();

    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        currentUser = user;
        loadApp();
    } else {
        alert('Invalid username or password!');
    }
}

function signup() {
    const username = document.getElementById('newUser').value.trim();
    const password = document.getElementById('newPass').value.trim();
    const bio = document.getElementById('newBio').value.trim();

    if (!username || !password) { alert('Username and password required!'); return; }

    const users = getUsers();
    if (users.some(u => u.username === username)) { alert('Username exists!'); return; }

    const newUser = { username, password, bio, avatar: '' };
    users.push(newUser);
    saveUsers(users);
    currentUser = newUser;
    loadApp();
}

function showSignup() {
    document.getElementById('loginPage').classList.add('hidden');
    document.getElementById('signupPage').classList.remove('hidden');
}

function showLogin() {
    document.getElementById('signupPage').classList.add('hidden');
    document.getElementById('loginPage').classList.remove('hidden');
}

// ===== Load App =====
function loadApp() {
    document.getElementById('loginPage').classList.add('hidden');
    document.getElementById('signupPage').classList.add('hidden');
    document.getElementById('appPage').classList.remove('hidden');

    // Update profile info
    document.getElementById('profileUsername').innerText = currentUser.username;
    document.getElementById('profileBioText').innerText = currentUser.bio || '';
    document.getElementById('profileAvatar').src = currentUser.avatar || 'https://i.ibb.co/6NX5vTq/default-avatar.png';

    // Show only home screen initially
    showScreen('homeScreen');

    renderHome();
    renderVideos();
    renderMarket();
    renderProfilePosts();
}

// ===== Render Functions =====
function renderHome() { renderFeed('homeFeed', getPosts()); }
function renderVideos() { renderFeed('videoFeed', getPosts().filter(p => p.type === 'video')); }
function renderProfilePosts() { renderFeed('profilePosts', getPosts().filter(p => p.user === currentUser.username)); }
function renderMarket() { renderFeed('marketFeed', getMarketItems(), true); }

// ===== Generic Feed Renderer =====
function renderFeed(containerId, items, isMarket = false) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';

    if (items.length === 0) {
        // Show 6 shimmer boxes
        for (let i = 0; i < 6; i++) {
            const box = document.createElement('div');
            box.className = 'loadingBox';
            container.appendChild(box);
        }
    } else {
        items.forEach(item => {
            const box = document.createElement('div');
            box.className = 'loadingBox';

            if (isMarket) {
                const img = document.createElement('img');
                img.src = item.photo;
                img.style.width = '100%';
                img.style.borderRadius = '12px';
                box.innerHTML = '';
                box.appendChild(img);
            } else if (item.type === 'image') {
                const img = document.createElement('img');
                img.src = item.data;
                img.style.width = '100%';
                img.style.borderRadius = '12px';
                box.innerHTML = '';
                box.appendChild(img);
            } else if (item.type === 'video') {
                const vid = document.createElement('video');
                vid.src = item.data;
                vid.controls = true;
                vid.style.width = '100%';
                vid.style.borderRadius = '12px';
                box.innerHTML = '';
                box.appendChild(vid);
            }

            container.appendChild(box);
        });
    }
}

// ===== Upload Posts =====
function uploadPost() {
    const file = document.getElementById('uploadFile').files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        const posts = getPosts();
        const type = file.type.startsWith('video') ? 'video' : 'image';
        posts.unshift({ user: currentUser.username, data: e.target.result, type });
        savePosts(posts);
        renderHome();
        renderVideos();
        renderProfilePosts();
    }
    reader.readAsDataURL(file);
}

// ===== Marketplace Upload =====
function addItem() {
    const photo = document.getElementById('itemPhoto').files[0];
    const name = document.getElementById('itemName').value.trim();
    const price = document.getElementById('itemPrice').value.trim();

    if (!photo || !name || !price) { alert('Complete all fields!'); return; }

    const reader = new FileReader();
    reader.onload = function (e) {
        const items = getMarketItems();
        items.unshift({ user: currentUser.username, name, price, photo: e.target.result });
        saveMarketItems(items);
        renderMarket();
    }
    reader.readAsDataURL(photo);
}

// ===== Messages =====
function sendChatMessage() {
    const input = document.getElementById('chatInput');
    if (input.value.trim() === '') return;

    const msg = document.createElement('div');
    msg.innerText = input.value.trim();
    msg.style.background = '#dcd6f7';
    msg.style.margin = '5px';
    msg.style.padding = '5px';
    msg.style.borderRadius = '10px';

    document.getElementById('chatMessages').appendChild(msg);
    input.value = '';
}

function closeChat() {
    document.getElementById('chatScreen').classList.add('hidden');
    document.getElementById('userList').classList.remove('hidden');
}

// ===== Profile =====
function updateProfilePic() {
    const file = document.createElement('input');
    file.type = 'file';
    file.accept = 'image/*';
    file.onchange = function () {
        const reader = new FileReader();
        reader.onload = function (e) {
            currentUser.avatar = e.target.result;
            document.getElementById('profileAvatar').src = currentUser.avatar;

            const users = getUsers();
            users[users.findIndex(u => u.username === currentUser.username)] = currentUser;
            saveUsers(users);
        }
        reader.readAsDataURL(file.files[0]);
    }
    file.click();
}

function editBio() {
    const newBio = prompt('Enter new bio:', currentUser.bio || '');
    if (newBio !== null) {
        currentUser.bio = newBio;
        document.getElementById('profileBioText').innerText = currentUser.bio;

        const users = getUsers();
        users[users.findIndex(u => u.username === currentUser.username)] = currentUser;
        saveUsers(users);
    }
}
