// INIT SUPABASE
const supabaseUrl = "https://wcpfihklsckizezbdkex.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndjcGZpaGtsc2NraXplemJka2V4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMyMzU1MjksImV4cCI6MjA3ODgxMTUyOX0.6cmKj6rLrN7i3-seUPUXk-o9HNlrN8tDb_ws7dyZSs4";
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// AUTH
async function signupUser() {
  const username = document.getElementById('signup-username').value.trim();
  const password = document.getElementById('signup-password').value.trim();
  if(!username || !password) { alert('Fill all fields'); return; }

  const { data, error } = await supabase
    .from('users')
    .insert([{ username, password }])
    .select();

  if(error) { alert(error.message); return; }

  localStorage.setItem('buzzify_current', username);
  showApp();
}

async function loginUser() {
  const username = document.getElementById('login-username').value.trim();
  const password = document.getElementById('login-password').value.trim();

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('username', username)
    .eq('password', password)
    .single();

  if(error || !data) { alert('Wrong credentials'); return; }

  localStorage.setItem('buzzify_current', username);
  showApp();
}

function toggleAuth() {
  document.getElementById('login-form').classList.toggle('hidden');
  document.getElementById('signup-form').classList.toggle('hidden');
}

function showApp(){
  document.getElementById('auth-screen').classList.add('hidden');
  document.getElementById('main-app').classList.remove('hidden');
  document.getElementById('main-nav').classList.remove('hidden');
  document.getElementById('profile-name').textContent = localStorage.getItem('buzzify_current');
  loadFeed();
  switchTab('tab-home');
}

// TABS
function switchTab(tabId){
  const tabs = document.querySelectorAll('.tab');
  tabs.forEach(t => t.classList.add('hidden'));
  document.getElementById(tabId).classList.remove('hidden');

  if(tabId === 'tab-messages') loadMessages();
  if(tabId === 'tab-marketplace') loadMarketplace();
}

// POSTS
async function loadFeed(){
  const feed = document.getElementById('feed');
  const explore = document.getElementById('explore-feed');
  feed.innerHTML = '';
  explore.innerHTML = '';

  const { data: posts, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  if(error) { console.error(error); return; }

  posts.forEach(post => {
    const postDiv = document.createElement('div');
    postDiv.className = 'post';
    postDiv.innerHTML = `<p><strong>${post.username}</strong>: ${post.content}</p>`;
    feed.appendChild(postDiv);
    explore.appendChild(postDiv.cloneNode(true));
  });
}

async function uploadPost(){
  const content = document.getElementById('upload-content').value.trim();
  if(!content) return alert('Enter content!');
  const username = localStorage.getItem('buzzify_current');

  const { data, error } = await supabase
    .from('posts')
    .insert([{ username, content }]);

  if(error) { alert(error.message); return; }

  document.getElementById('upload-content').value = '';
  loadFeed();
}

// MESSAGES
async function sendMessage(){
  const from = localStorage.getItem('buzzify_current');
  const to = document.getElementById('message-to').value.trim();
  const message = document.getElementById('message-content').value.trim();
  if(!to || !message) return alert('Fill both fields');

  const { data, error } = await supabase
    .from('messages')
    .insert([{ from_user: from, to_user: to, message }]);

  if(error) { alert(error.message); return; }

  document.getElementById('message-to').value = '';
  document.getElementById('message-content').value = '';
  loadMessages();
}

async function loadMessages(){
  const current = localStorage.getItem('buzzify_current');
  const messagesDiv = document.getElementById('messages-list');
  messagesDiv.innerHTML = '';

  const { data: messages, error } = await supabase
    .from('messages')
    .select('*')
    .or(`from_user.eq.${current},to_user.eq.${current}`)
    .order('created_at', { ascending: false });

  if(error) { console.error(error); return; }

  messages.forEach(msg => {
    const div = document.createElement('div');
    div.innerHTML = `<p><strong>${msg.from_user} → ${msg.to_user}:</strong> ${msg.message}</p>`;
    messagesDiv.appendChild(div);
  });
}

// MARKETPLACE
async function addItemToMarket(){
  const seller = localStorage.getItem('buzzify_current');
  const item = document.getElementById('market-item').value.trim();
  const price = document.getElementById('market-price').value.trim();
  if(!item || !price) return alert('Fill both fields');

  const { data, error } = await supabase
    .from('marketplace')
    .insert([{ seller, item, price }]);

  if(error) { alert(error.message); return; }

  document.getElementById('market-item').value = '';
  document.getElementById('market-price').value = '';
  loadMarketplace();
}

async function loadMarketplace(){
  const marketDiv = document.getElementById('market-list');
  marketDiv.innerHTML = '';

  const { data: items, error } = await supabase
    .from('marketplace')
    .select('*')
    .order('created_at', { ascending: false });

  if(error) { console.error(error); return; }

  items.forEach(entry => {
    const div = document.createElement('div');
    div.innerHTML = `<p><strong>${entry.item}</strong> - $${entry.price} (Seller: ${entry.seller})</p>`;
    marketDiv.appendChild(div);
  });
}

// DARK MODE
function toggleDarkMode(){
  document.body.classList.toggle('dark-mode');
}

// LOGOUT
function logout(){
  localStorage.removeItem('buzzify_current');
  location.reload();
}

// INITIALIZE
document.addEventListener('DOMContentLoaded', ()=>{
  loadFeed();
});
