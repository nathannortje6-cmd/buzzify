// ===== Screen Navigation =====
function showScreen(screen) {
    document.querySelectorAll('.mainScreen').forEach(s => s.classList.add('hidden'));
    document.getElementById(screen).classList.remove('hidden');
}

// ===== Login / Signup =====
function showLogin() {
    document.getElementById('signupPage').classList.add('hidden');
    document.getElementById('loginPage').classList.remove('hidden');
}

function showSignup() {
    document.getElementById('loginPage').classList.add('hidden');
    document.getElementById('signupPage').classList.remove('hidden');
}

function login() {
    const username = document.getElementById('loginUser').value;
    const password = document.getElementById('loginPass').value;
    if (!username || !password) return alert("Enter username and password");

    const storedPass = localStorage.getItem(username);
    if (storedPass && storedPass === password) {
        localStorage.setItem('currentUser', username);
        document.getElementById('loginPage').classList.add('hidden');
        document.getElementById('appPage').classList.remove('hidden');
        loadFeeds();
        loadProfile();
    } else {
        alert("Invalid credentials");
    }
}

function signup() {
    const username = document.getElementById('newUser').value;
    const password = document.getElementById('newPass').value;
    const bio = document.getElementById('newBio').value;

    if (!username || !password) return alert("Enter username and password");

    if (localStorage.getItem(username)) {
        alert("Username already exists");
        return;
    }

    localStorage.setItem(username, password);
    localStorage.setItem(username + "_bio", bio);
    showLogin();
    alert("Account created, please login");
}

// ===== Load Feeds (shimmer boxes) =====
function loadFeeds() {
    const homeFeed = document.getElementById('homeFeed');
    const videoFeed = document.getElementById('videoFeed');
    const marketFeed = document.getElementById('marketFeed');
    const profilePosts = document.getElementById('profilePosts');

    [homeFeed, videoFeed, marketFeed, profilePosts].forEach(feed => feed.innerHTML = "");

    for (let i = 0; i < 6; i++) {
        const box1 = document.createElement('div'); box1.className = "loadingBox";
        const box2 = document.createElement('div'); box2.className = "loadingBox";
        const box3 = document.createElement('div'); box3.className = "loadingBox";
        const box4 = document.createElement('div'); box4.className = "loadingBox";

        homeFeed.appendChild(box1.cloneNode());
        videoFeed.appendChild(box2.cloneNode());
        marketFeed.appendChild(box3.cloneNode());
        profilePosts.appendChild(box4.cloneNode());
    }
}

// ===== Profile =====
function loadProfile() {
    const username = localStorage.getItem('currentUser');
    if (!username) return;
    document.getElementById('profileUsername').innerText = username;
    document.getElementById('profileBioText').innerText = localStorage.getItem(username + "_bio") || "";
}

function editBio() {
    const newBio = prompt("Edit your bio:", document.getElementById('profileBioText').innerText);
    if (!newBio) return;
    const username = localStorage.getItem('currentUser');
    localStorage.setItem(username + "_bio", newBio);
    loadProfile();
}

function updateProfilePic() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = () => {
        const file = fileInput.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
            document.getElementById('profileAvatar').src = reader.result;
        };
        reader.readAsDataURL(file);
    };
    fileInput.click();
}

// ===== Upload Posts =====
function uploadPost() {
    const fileInput = document.getElementById('uploadFile');
    const preview = document.getElementById('uploadPreview');
    const file = fileInput.files[0];
    if (!file) return alert("No file selected");
    const reader = new FileReader();
    reader.onload = () => {
        const div = document.createElement('div');
        div.className = "loadingBox";
        div.style.backgroundImage = `url(${reader.result})`;
        div.style.backgroundSize = 'cover';
        div.style.backgroundPosition = 'center';
        preview.appendChild(div);
    };
    reader.readAsDataURL(file);
}

// ===== Marketplace =====
function addItem() {
    const fileInput = document.getElementById('itemPhoto');
    const name = document.getElementById('itemName').value;
    const price = document.getElementById('itemPrice').value;

    if (!fileInput.files[0] || !name || !price) return alert("Complete all fields");

    const reader = new FileReader();
    reader.onload = () => {
        const div = document.createElement('div');
        div.className = "loadingBox";
        div.style.backgroundImage = `url(${reader.result})`;
        div.style.backgroundSize = 'cover';
        div.style.backgroundPosition = 'center';
        marketFeed.appendChild(div);
    };
    reader.readAsDataURL(fileInput.files[0]);
}

// ===== Messaging =====
function sendChatMessage() {
    const chatInput = document.getElementById('chatInput');
    const msg = chatInput.value.trim();
    if (!msg) return;
    const chatMessages = document.getElementById('chatMessages');
    const div = document.createElement('div');
    div.innerText = msg;
    div.style.backgroundColor = '#ba68c8';
    div.style.padding = '5px 10px';
    div.style.borderRadius = '10px';
    div.style.margin = '5px 0';
    chatMessages.appendChild(div);
    chatInput.value = '';
}

function openChat(user) {
    document.getElementById('chatUser').innerText = user;
    document.getElementById('chatScreen').classList.remove('hidden');
    document.getElementById('userList').classList.add('hidden');
}

function closeChat() {
    document.getElementById('chatScreen').classList.add('hidden');
    document.getElementById('userList').classList.remove('hidden');
}

// ===== Dummy Users for Messaging =====
function loadUsers() {
    const userList = document.getElementById('userList');
    userList.innerHTML = '';
    const current = localStorage.getItem('currentUser');
    const users = ['Alice', 'Bob', 'Charlie', 'Dave', current]; // dummy
    users.forEach(u => {
        if (u === current) return;
        const btn = document.createElement('button');
        btn.innerText = u;
        btn.onclick = () => openChat(u);
        userList.appendChild(btn);
    });
}

// ===== Initial Load =====
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('currentUser')) {
        document.getElementById('loginPage').classList.add('hidden');
        document.getElementById('appPage').classList.remove('hidden');
        loadFeeds();
        loadProfile();
        loadUsers();
    }
});
