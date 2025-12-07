// ===== Local Storage Login =====
function showScreen(screen){
    document.querySelectorAll('.mainScreen').forEach(s => s.classList.add('hidden'));
    document.getElementById(screen).classList.remove('hidden');
}

function showLogin(){
    document.getElementById('signupPage').classList.add('hidden');
    document.getElementById('loginPage').classList.remove('hidden');
}

function showSignup(){
    document.getElementById('loginPage').classList.add('hidden');
    document.getElementById('signupPage').classList.remove('hidden');
}

function login(){
    const u = document.getElementById('loginUser').value;
    const p = document.getElementById('loginPass').value;
    if(localStorage.getItem(u) === p){
        document.getElementById('loginPage').classList.add('hidden');
        document.getElementById('appPage').classList.remove('hidden');
        loadFeeds();
    } else alert("Wrong credentials");
}

function signup(){
    const u = document.getElementById('newUser').value;
    const p = document.getElementById('newPass').value;
    if(u && p){
        localStorage.setItem(u,p);
        localStorage.setItem(u+"_bio","");
        document.getElementById('signupPage').classList.add('hidden');
        document.getElementById('loginPage').classList.remove('hidden');
    } else alert("Enter username and password");
}

// ===== LOADING SHIMMER CARDS =====
function loadFeeds(){
    const homeFeed = document.getElementById('homeFeed');
    const videoFeed = document.getElementById('videoFeed');
    const marketFeed = document.getElementById('marketFeed');
    const profilePosts = document.getElementById('profilePosts');
    homeFeed.innerHTML=""; videoFeed.innerHTML=""; marketFeed.innerHTML=""; profilePosts.innerHTML="";
    for(let i=0;i<6;i++){
        const post = document.createElement('div'); post.className="post loading";
        const vpost = document.createElement('div'); vpost.className="videoPost loading";
        const mpost = document.createElement('div'); mpost.className="marketItem loading";
        const ppost = document.createElement('div'); ppost.className="loading";
        homeFeed.appendChild(post); videoFeed.appendChild(vpost);
        marketFeed.appendChild(mpost); profilePosts.appendChild(ppost);
    }
}
