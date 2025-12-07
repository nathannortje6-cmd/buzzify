// ===== Local Storage Keys =====
const USERS_KEY = 'buzzify_users';
const POSTS_KEY = 'buzzify_posts';
const MARKET_KEY = 'buzzify_market';

// ===== Helper Functions =====
function getUsers() {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
}

function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function getPosts() {
    return JSON.parse(localStorage.getItem(POSTS_KEY)) || [];
}

function savePosts(posts) {
    localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
}

function getMarketItems() {
    return JSON.parse(localStorage.getItem(MARKET_KEY)) || [];
}

function saveMarketItems(items) {
    localStorage.setItem(MARKET_KEY, JSON.stringify(items));
}

// ===== Screen Management =====
function showScreen(screenId) {
    const screens = document.querySelectorAll('.mainScreen');
    screens.forEach(s => s.classList.add('hidden'));
    document.getElementById(screenId).classList.remove('hidden');
}

// ===== Login / Signup =====
let currentUser = null;

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

    if (!username || !password) {
        alert('Username and password required!');
        return;
    }

    const users = getUsers();
    if (users.some(u => u.username === username)) {
        alert('Username already exists!');
        return;
    }

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

    document.getElementById('profileUsername').innerText = currentUser.username;
    document.getElementById('profileBioText').innerText = currentUser.bio || '';
    if(currentUser.avatar) document.getElementById('profileAvatar').src = currentUser.avatar;

    renderHome();
    renderVideos();
    renderMarket();
    renderProfilePosts();
}

// ===== Render Home Feed =====
function renderHome() {
    const homeFeed = document.getElementById('homeFeed');
    homeFeed.innerHTML = '';
    const posts = getPosts();

    if(posts.length === 0) {
        // Show shimmer boxes
        for(let i=0;i<6;i++){
            const box = document.createElement('div');
            box.className = 'loadingBox';
            homeFeed.appendChild(box);
        }
    } else {
        posts.forEach(post => {
            const div = document.createElement('div');
            div.className = 'loadingBox';
            if(post.type === 'image'){
                const img = document.createElement('img');
                img.src = post.data;
                img.style.width = '100%';
                img.style.borderRadius = '12px';
                div.innerHTML = '';
                div.appendChild(img);
            } else if(post.type === 'video'){
                const vid = document.createElement('video');
                vid.src = post.data;
                vid.controls = true;
                vid.style.width = '100%';
                vid.style.borderRadius = '12px';
                div.innerHTML = '';
                div.appendChild(vid);
            }
            homeFeed.appendChild(div);
        });
    }
}

// ===== Render Videos Feed =====
function renderVideos() {
    const videoFeed = document.getElementById('videoFeed');
    videoFeed.innerHTML = '';
    const posts = getPosts().filter(p=>p.type==='video');

    if(posts.length === 0){
        for(let i=0;i<6;i++){
            const box = document.createElement('div');
            box.className = 'loadingBox';
            videoFeed.appendChild(box);
        }
    } else {
        posts.forEach(post=>{
            const div = document.createElement('div');
            div.className='loadingBox';
            const vid = document.createElement('video');
            vid.src = post.data;
            vid.controls = true;
            vid.style.width='100%';
            vid.style.borderRadius='12px';
            div.innerHTML = '';
            div.appendChild(vid);
            videoFeed.appendChild(div);
        });
    }
}

// ===== Upload Posts =====
function uploadPost() {
    const file = document.getElementById('uploadFile').files[0];
    if(!file) return;

    const reader = new FileReader();
    reader.onload = function(e){
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

// ===== Render Profile Posts =====
function renderProfilePosts() {
    const profilePosts = document.getElementById('profilePosts');
    profilePosts.innerHTML = '';
    const posts = getPosts().filter(p=>p.user===currentUser.username);
    if(posts.length===0){
        for(let i=0;i<3;i++){
            const box=document.createElement('div');
            box.className='loadingBox';
            profilePosts.appendChild(box);
        }
    } else {
        posts.forEach(post=>{
            const div=document.createElement('div');
            div.className='loadingBox';
            if(post.type==='image'){
                const img=document.createElement('img');
                img.src=post.data;
                img.style.width='100%';
                img.style.borderRadius='12px';
                div.innerHTML='';
                div.appendChild(img);
            } else {
                const vid=document.createElement('video');
                vid.src=post.data;
                vid.controls=true;
                vid.style.width='100%';
                vid.style.borderRadius='12px';
                div.innerHTML='';
                div.appendChild(vid);
            }
            profilePosts.appendChild(div);
        });
    }
}

// ===== Marketplace =====
function addItem() {
    const photo = document.getElementById('itemPhoto').files[0];
    const name = document.getElementById('itemName').value.trim();
    const price = document.getElementById('itemPrice').value.trim();

    if(!photo || !name || !price){
        alert('Complete all fields!');
        return;
    }

    const reader = new FileReader();
    reader.onload=function(e){
        const items=getMarketItems();
        items.unshift({user:currentUser.username, name, price, photo:e.target.result});
        saveMarketItems(items);
        renderMarket();
    }
    reader.readAsDataURL(photo);
}

function renderMarket(){
    const marketFeed=document.getElementById('marketFeed');
    marketFeed.innerHTML='';
    const items=getMarketItems();
    if(items.length===0){
        for(let i=0;i<6;i++){
            const box=document.createElement('div');
            box.className='loadingBox';
            marketFeed.appendChild(box);
        }
    } else {
        items.forEach(item=>{
            const div=document.createElement('div');
            div.className='loadingBox';
            const img=document.createElement('img');
            img.src=item.photo;
            img.style.width='100%';
            img.style.borderRadius='12px';
            div.innerHTML='';
            div.appendChild(img);
            marketFeed.appendChild(div);
        });
    }
}

// ===== Messages (Simplified) =====
function sendChatMessage() {
    const input=document.getElementById('chatInput');
    if(input.value.trim()==='') return;
    const chatMessages=document.getElementById('chatMessages');
    const msg=document.createElement('div');
    msg.innerText=input.value.trim();
    msg.style.background='#dcd6f7';
    msg.style.margin='5px';
    msg.style.padding='5px';
    msg.style.borderRadius='10px';
    chatMessages.appendChild(msg);
    input.value='';
}

// ===== Profile =====
function updateProfilePic(){
    const file=document.createElement('input');
    file.type='file';
    file.accept='image/*';
    file.onchange=function(){
        const reader=new FileReader();
        reader.onload=function(e){
            currentUser.avatar=e.target.result;
            document.getElementById('profileAvatar').src=currentUser.avatar;
            const users=getUsers();
            const idx=users.findIndex(u=>u.username===currentUser.username);
            users[idx]=currentUser;
            saveUsers(users);
        }
        reader.readAsDataURL(file.files[0]);
    }
    file.click();
}

function editBio(){
    const newBio=prompt('Enter new bio:', currentUser.bio || '');
    if(newBio!==null){
        currentUser.bio=newBio;
        document.getElementById('profileBioText').innerText=currentUser.bio;
        const users=getUsers();
        const idx=users.findIndex(u=>u.username===currentUser.username);
        users[idx]=currentUser;
        saveUsers(users);
    }
}

// ===== Chat Screen =====
function closeChat(){
    document.getElementById('chatScreen').classList.add('hidden');
    document.getElementById('userList').classList.remove('hidden');
}
