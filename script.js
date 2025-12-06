
// -------------------- AUTH --------------------
function toggleAuth() {
  document.getElementById('login-form').classList.toggle('hidden');
  document.getElementById('signup-form').classList.toggle('hidden');
}

function signupUser() {
  const username = document.getElementById('signup-username').value.trim();
  const password = document.getElementById('signup-password').value.trim();
  if (!username || !password) { alert('Fill all fields'); return; }

  let users = JSON.parse(localStorage.getItem('buzzify_users') || '{}');
  if(users[username]){
    alert('Username already exists');
    return;
  }

  users[username] = { password: password, messages: [], posts: [] };
  localStorage.setItem('buzzify_users', JSON.stringify(users));
  localStorage.setItem('buzzify_current', username);
  showApp();
}

function loginUser() {
  const username = document.getElementById('login-username').value.trim();
  const password = document.getElementById('login-password').value.trim();

  let users = JSON.parse(localStorage.getItem('buzzify_users') || '{}');
  if(users[username] && users[username].password === password){
    localStorage.setItem('buzzify_current', username);
    showApp();
  } else {
    alert('Wrong credentials');
  }
}

function showApp(){
  document.getElementById('auth-screen').classList.add('hidden');
  document.getElementById('main-app').classList.remove('hidden');
  document.getElementById('main-nav').classList.remove('hidden');
  loadFeed();
  switchTab('tab-home');
}

// -------------------- TABS --------------------
function switchTab(tabId){
  const tabs = document.querySelectorAll('.tab');
  tabs.forEach(t => t.classList.add('hidden'));
  document.getElementById(tabId).classList.remove('hidden');
}

// -------------------- FEED --------------------
function loadFeed(){
  const feed = document.getElementById('feed');
  const explore = document.getElementById('explore-feed');
  feed.innerHTML = '';
  explore.innerHTML = '';

  let users = JSON.parse(localStorage.getItem('buzzify_users') || '{}');

  for(const [username, data] of Object.entries(users)){
    data.posts.forEach((post, i) => {
      const postDiv = document.createElement('div');
      postDiv.className = 'post';
      postDiv.innerHTML = `<p><strong>${username}</strong>: ${post}</p>`;
      feed.appendChild(postDiv);
      explore.appendChild(postDiv.cloneNode(true));
    });
  }
}

// -------------------- UPLOAD --------------------
function uploadPost(){
  const content = prompt('Enter your post content or video URL:');
  if(!content) return;
  const current = localStorage.getItem('buzzify_current');
  let users = JSON.parse(localStorage.getItem('buzzify_users'));
  users[current].posts.push(content);
  localStorage.setItem('buzzify_users', JSON.stringify(users));
  loadFeed();
}

// -------------------- MESSAGES --------------------
function sendMessage(){
  const current = localStorage.getItem('buzzify_current');
  const to = prompt('Send message to (username):');
  if(!to) return;
  const message = prompt('Enter message:');
  if(!message) return;

  let users = JSON.parse(localStorage.getItem('buzzify_users'));
  if(!users[to]) { alert('User does not exist'); return; }

  users[to].messages.push({ from: current, message: message });
  localStorage.setItem('buzzify_users', JSON.stringify(users));
  alert('Message sent!');
}

function loadMessages(){
  const current = localStorage.getItem('buzzify_current');
  const users = JSON.parse(localStorage.getItem('buzzify_users'));
  const messagesDiv = document.getElementById('tab-messages');
  messagesDiv.innerHTML = '<h2>Messages</h2>';
  users[current].messages.forEach(msg => {
    const div = document.createElement('div');
    div.innerHTML = `<p><strong>${msg.from}:</strong> ${msg.message}</p>`;
    messagesDiv.appendChild(div);
  });
}

// -------------------- MARKETPLACE --------------------
function addItemToMarket(){
  const item = prompt('Enter item name:');
  if(!item) return;
  const price = prompt('Enter price:');
  if(!price) return;

  let market = JSON.parse(localStorage.getItem('buzzify_market') || '[]');
  market.push({ seller: localStorage.getItem('buzzify_current'), item, price });
  localStorage.setItem('buzzify_market', JSON.stringify(market));
  loadMarketplace();
}

function loadMarketplace(){
  const marketDiv = document.getElementById('tab-marketplace');
  marketDiv.innerHTML = '<h2>Marketplace</h2>';
  let market = JSON.parse(localStorage.getItem('buzzify_market') || '[]');
  market.forEach(entry => {
    const div = document.createElement('div');
    div.innerHTML = `<p><strong>${entry.item}</strong> - $${entry.price} (Seller: ${entry.seller})</p>`;
    marketDiv.appendChild(div);
  });
}

// -------------------- INITIALIZE --------------------
document.addEventListener('DOMContentLoaded', ()=>{
  document.getElementById('tab-upload').addEventListener('click', uploadPost);
  document.getElementById('tab-messages').addEventListener('click', loadMessages);
  document.getElementById('tab-marketplace').addEventListener('click', loadMarketplace);
});
