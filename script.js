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

// Profile edit elements
const avatarInput = document.getElementById('avatar-input');
const profileAvatar = document.getElementById('profile-avatar');
const changeAvatarBtn = document.getElementById('change-avatar-btn');

const profileUsernameDisplay = document.getElementById('profile-username-display');
const profileUsernameInput = document.getElementById('profile-username-input');
const editUsernameBtn = document.getElementById('edit-username-btn');
const saveUsernameBtn = document.getElementById('save-username-btn');

const profileBioDisplay = document.getElementById('profile-bio-display');
const profileBioInput = document.getElementById('profile-bio-input');
const editBioBtn = document.getElementById('edit-bio-btn');
const saveBioBtn = document.getElementById('save-bio-btn');

// Home feed elements
const postMediaInput = document.getElementById('post-media-input');
const postCaptionInput = document.getElementById('post-caption');
const createPostBtn = document.getElementById('create-post-btn');
const postsFeed = document.getElementById('posts-feed');

// ==============================
// HELPER FUNCTIONS
// ==============================

// Show app and default to Home
function showApp() {
    loginScreen.style.display = 'none';
    appScreen.style.display = 'block';
    showSection('Home');
    loadProfileData();
    updateProfile();
    renderPosts();
}

// Show only the selected section
function showSection(section) {
    feedContainer.style.display = 'none';
    profileContainer.style.display = 'none';
    marketplaceContainer.style.display = 'none';
    chatContainer.style.display = 'none';
    navbarItems.forEach(item => item.classList.remove('active'));

    switch(section) {
        case 'Home':
            feedContainer.style.display = 'block';
            navbarItems[0].classList.add('active');
            break;
        case 'Explore':
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

// Update profile stats
function updateProfile() {
    const currentUser = localStorage.getItem('buzzify_current_user');
    if (!currentUser) return;

    const users = JSON.parse(localStorage.getItem('buzzify_users')) || {};
    const user = users[currentUser];

    profileContainer.querySelector('.profile-stats').innerHTML = `
        <div>Followers: ${user.followers}</div>
        <div>Following: ${user.following}</div>
        <div>Likes: ${user.likes}</div>
    `;
}

// Load avatar, username, bio
function loadProfileData() {
    const currentUser = localStorage.getItem('buzzify_current_user');
    if (!currentUser) return;

    const users = JSON.parse(localStorage.getItem('buzzify_users')) || {};
    const user = users[currentUser];

    // Avatar
    if(user.avatar){
        profileAvatar.style.backgroundImage = `url(${user.avatar})`;
        profileAvatar.style.backgroundSize = 'cover';
        profileAvatar.style.backgroundPosition = 'center';
    } else {
        profileAvatar.style.backgroundImage = '';
    }

    // Username & bio
    profileUsernameDisplay.textContent = currentUser;
    profileUsernameInput.value = currentUser;
    profileBioDisplay.textContent = user.bio || '';
    profileBioInput.value = user.bio || '';
}

// ==============================
// LOGIN / SIGNUP
// ==============================
signupForm.addEventListener('submit', e => {
    e.preventDefault();
    const username = signupUsername.value.trim();
    const password = signupPassword.value.trim();
    if(!username || !password){
        alert('Please enter username and password.');
        return;
    }

    let users = JSON.parse(localStorage.getItem('buzzify_users')) || {};
    if(users[username]){
        alert('Username already exists!');
        return;
    }

    users[username] = {
        password: password,
        followers: 0,
        following: 0,
        likes: 0,
        bio: "This is your bio!",
        avatar: null,
        posts: []
    };

    localStorage.setItem('buzzify_users', JSON.stringify(users));
    localStorage.setItem('buzzify_current_user', username);
    alert('Sign-up successful!');
    showApp();
});

loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const username = loginUsername.value.trim();
    const password = loginPassword.value.trim();

    const users = JSON.parse(localStorage.getItem('buzzify_users')) || {};
    if(!users[username]){
        alert('Username does not exist.');
        return;
    }
    if(users[username].password !== password){
        alert('Incorrect password.');
        return;
    }

    localStorage.setItem('buzzify_current_user', username);
    showApp();
});

// ==============================
// LOGOUT
// ==============================
function logout(){
    localStorage.removeItem('buzzify_current_user');
    loginScreen.style.display = 'flex';
    appScreen.style.display = 'none';
}

// ==============================
// NAVIGATION
// ==============================
navbarItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        switch(index){
            case 0: showSection('Home'); break;
            case 1: showSection('Explore'); break;
            case 2: showSection('Chat'); break;
            case 3: showSection('Marketplace'); break;
            case 4: showSection('Profile'); break;
        }
    });
});

// ==============================
// PROFILE EDIT
// ==============================
// Change Avatar
changeAvatarBtn.addEventListener('click', () => avatarInput.click());
avatarInput.addEventListener('change', e => {
    const file = e.target.files[0];
    if(!file) return;
    const reader = new FileReader();
    reader.onload = function(event){
        const currentUser = localStorage.getItem('buzzify_current_user');
        const users = JSON.parse(localStorage.getItem('buzzify_users')) || {};
        users[currentUser].avatar = event.target.result;
        localStorage.setItem('buzzify_users', JSON.stringify(users));
        loadProfileData();
    }
    reader.readAsDataURL(file);
});

// Edit Username
editUsernameBtn.addEventListener('click', () => {
    profileUsernameDisplay.style.display = 'none';
    profileUsernameInput.style.display = 'inline-block';
    editUsernameBtn.style.display = 'none';
    saveUsernameBtn.style.display = 'inline-block';
});
saveUsernameBtn.addEventListener('click', () => {
    const newUsername = profileUsernameInput.value.trim();
    if(!newUsername) { alert('Username cannot be empty'); return; }

    const currentUser = localStorage.getItem('buzzify_current_user');
    let users = JSON.parse(localStorage.getItem('buzzify_users')) || {};

    if(users[newUsername] && newUsername !== currentUser){
        alert('Username already exists');
        return;
    }

    users[newUsername] = {...users[currentUser]};
    if(newUsername !== currentUser) delete users[currentUser];
    localStorage.setItem('buzzify_current_user', newUsername);
    localStorage.setItem('buzzify_users', JSON.stringify(users));
    loadProfileData();
    updateProfile();

    profileUsernameDisplay.style.display = 'inline-block';
    profileUsernameInput.style.display = 'none';
    editUsernameBtn.style.display = 'inline-block';
    saveUsernameBtn.style.display = 'none';
});

// Edit Bio
editBioBtn.addEventListener('click', () => {
    profileBioDisplay.style.display = 'none';
    profileBioInput.style.display = 'block';
    editBioBtn.style.display = 'none';
    saveBioBtn.style.display = 'inline-block';
});
saveBioBtn.addEventListener('click', () => {
    const newBio = profileBioInput.value.trim();
    const currentUser = localStorage.getItem('buzzify_current_user');
    let users = JSON.parse(localStorage.getItem('buzzify_users')) || {};
    users[currentUser].bio = newBio;
    localStorage.setItem('buzzify_users', JSON.stringify(users));
    profileBioDisplay.textContent = newBio;

    profileBioDisplay.style.display = 'inline';
    profileBioInput.style.display = 'none';
    editBioBtn.style.display = 'inline-block';
    saveBioBtn.style.display = 'none';
});

// ==============================
// HOME FEED POST FUNCTIONALITY
// ==============================
function renderPosts() {
    const currentUser = localStorage.getItem('buzzify_current_user');
    if(!currentUser) return;

    const users = JSON.parse(localStorage.getItem('buzzify_users')) || {};
    const user = users[currentUser];
    const posts = user.posts || [];

    postsFeed.innerHTML = '';

    posts.slice().reverse().forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('video-post');

        const mediaElement = post.type === 'video' ? 
            `<video src="${post.media}" controls></video>` :
            `<img src="${post.media}" alt="Post Image">`;

        postElement.innerHTML = `
            <div class="post-header">
                <div class="avatar"></div>
                <div class="username">${currentUser}</div>
            </div>
            <div class="media-placeholder">
                ${mediaElement}
            </div>
            <div class="post-caption">${post.caption}</div>
            <div class="post-actions">
                <button class="like-btn">${post.likes} ❤️ Like</button>
            </div>
        `;

        const likeBtn = postElement.querySelector('.like-btn');
        likeBtn.addEventListener('click', () => {
            post.likes++;
            likeBtn.textContent = `${post.likes} ❤️ Like`;
            users[currentUser].posts = user.posts;
            localStorage.setItem('buzzify_users', JSON.stringify(users));
            updateProfile();
        });

        postsFeed.appendChild(postElement);
    });
}

// Create new post
createPostBtn.addEventListener('click', () => {
    const file = postMediaInput.files[0];
    const caption = postCaptionInput.value.trim();
    if(!file){
        alert('Please select an image or video to post.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(event){
        const currentUser = localStorage.getItem('buzzify_current_user');
        const users = JSON.parse(localStorage.getItem('buzzify_users')) || {};
        const user = users[currentUser];

        if(!user.posts) user.posts = [];

        const type = file.type.startsWith('video') ? 'video' : 'image';
        user.posts.push({
            media: event.target.result,
            caption: caption,
            type: type,
            likes: 0
        });

        users[currentUser] = user;
        localStorage.setItem('buzzify_users', JSON.stringify(users));

        postMediaInput.value = '';
        postCaptionInput.value = '';
        renderPosts();
    }
    reader.readAsDataURL(file);
});

// ==============================
// INITIAL LOAD (FIXED LOGIN LOOP)
// ==============================
window.addEventListener('load', () => {
    const currentUser = localStorage.getItem('buzzify_current_user');
    const users = JSON.parse(localStorage.getItem('buzzify_users')) || {};

    if(currentUser && users[currentUser]){
        showApp();
    } else {
        localStorage.removeItem('buzzify_current_user');
        loginScreen.style.display = 'flex';
        appScreen.style.display = 'none';
    }
});
