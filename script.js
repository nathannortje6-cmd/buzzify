function showSignup() {
    document.getElementById("loginPage").classList.add("hidden");
    document.getElementById("signupPage").classList.remove("hidden");
}
function showLogin() {
    document.getElementById("signupPage").classList.add("hidden");
    document.getElementById("loginPage").classList.remove("hidden");
}
function signup() {
    let user = document.getElementById("newUser").value.trim();
    let pass = document.getElementById("newPass").value.trim();
    if(!user || !pass){ alert("Please fill all fields"); return; }
    localStorage.setItem("buzzify_user", user);
    localStorage.setItem("buzzify_pass", pass);
    alert("Account created! You can now login.");
    showLogin();
}
function login() {
    let user = document.getElementById("loginUser").value.trim();
    let pass = document.getElementById("loginPass").value.trim();
    let savedUser = localStorage.getItem("buzzify_user");
    let savedPass = localStorage.getItem("buzzify_pass");
    if(user===savedUser && pass===savedPass){
        document.getElementById("loginPage").classList.add("hidden");
        document.getElementById("signupPage").classList.add("hidden");
        document.getElementById("homePage").classList.remove("hidden");
        document.getElementById("welcomeText").innerText="Logged in as: "+savedUser;
        loadFeed();
    } else { alert("Incorrect username or password"); }
}
function logout(){
    document.getElementById("homePage").classList.add("hidden");
    document.getElementById("loginPage").classList.remove("hidden");
    document.getElementById("loginUser").value="";
    document.getElementById("loginPass").value="";
}
function createPost(){
    let text=document.getElementById("postText").value.trim();
    if(!text) return;
    let posts=JSON.parse(localStorage.getItem("buzzifyPosts")||"[]");
    posts.unshift({user:localStorage.getItem("buzzify_user"),content:text,time:new Date().toLocaleString()});
    localStorage.setItem("buzzifyPosts",JSON.stringify(posts));
    document.getElementById("postText").value="";
    loadFeed();
}
function loadFeed(){
    let posts=JSON.parse(localStorage.getItem("buzzifyPosts")||"[]");
    let feed=document.getElementById("feed");
    feed.innerHTML="";
    posts.forEach(p=>{
        feed.innerHTML+=`<div class="post"><b>${p.user}</b>${p.content}<small>${p.time}</small></div>`;
    });
}
