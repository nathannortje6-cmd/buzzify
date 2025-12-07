// Screen navigation
function showScreen(id){
    const screens=document.querySelectorAll('.mainScreen');
    screens.forEach(s=>s.classList.add('hidden'));
    document.getElementById(id).classList.remove('hidden');
}

// Login/signup
function showSignup(){document.getElementById("loginPage").classList.add("hidden"); document.getElementById("signupPage").classList.remove("hidden");}
function showLogin(){document.getElementById("signupPage").classList.add("hidden"); document.getElementById("loginPage").classList.remove("hidden");}
function signup(){
    let user=document.getElementById("newUser").value.trim();
    let pass=document.getElementById("newPass").value.trim();
    let bio=document.getElementById("newBio").value.trim();
    if(!user||!pass){alert("Fill all fields"); return;}
    localStorage.setItem("buzzify_user",user);
    localStorage.setItem("buzzify_pass",pass);
    localStorage.setItem("buzzify_bio",bio);
    alert("Account created!");
    showLogin();
}
function login(){
    let user=document.getElementById("loginUser").value.trim();
    let pass=document.getElementById("loginPass").value.trim();
    if(user===localStorage.getItem("buzzify_user") && pass===localStorage.getItem("buzzify_pass")){
        document.getElementById("loginPage").classList.add("hidden");
        document.getElementById("signupPage").classList.add("hidden");
        document.getElementById("appPage").classList.remove("hidden");
        showScreen('homeScreen');
        loadHome();
        loadVideos();
        loadMarket();
        loadMessages();
        loadProfile();
    } else { alert("Incorrect credentials"); }
}

// Posts
function loadHome(){
    const feed=document.getElementById("homeFeed");
    const posts=JSON.parse(localStorage.getItem("buzzify_posts")||"[]");
    feed.innerHTML="";
    posts.forEach(p=>{
        if(p.type==='image')
            feed.innerHTML+=`<div class="post"><b>${p.user}</b><img src="${p.content}" style="width:100%;border-radius:15px;"></div>`;
        else if(p.type==='video')
            feed.innerHTML+=`<div class="post"><b>${p.user}</b><video src="${p.content}" controls style="width:100%;border-radius:15px;"></video></div>`;
    });
}
function loadVideos(){
    const feed=document.getElementById("videoFeed");
    const posts=JSON.parse(localStorage.getItem("buzzify_posts")||"[]");
    feed.innerHTML="";
    posts.forEach(p=>{
        if(p.type==='video')
            feed.innerHTML+=`<div class="post"><b>${p.user}</b><video src="${p.content}" controls style="width:100%;border-radius:15px;"></video></div>`;
    });
}
function uploadPost(){
    const file=document.getElementById("uploadFile").files[0];
    if(!file){alert("Select a file"); return;}
    const reader=new FileReader();
    reader.onload=function(e){
        let posts=JSON.parse(localStorage.getItem("buzzify_posts")||"[]");
        let type=file.type.includes("video")?'video':'image';
        posts.unshift({user:localStorage.getItem("buzzify_user"),content:e.target.result,type:type});
        localStorage.setItem("buzzify_posts",JSON.stringify(posts));
        loadHome(); loadVideos();
        alert("Uploaded!");
    }
    reader.readAsDataURL(file);
}

// Marketplace
function addItem(){
    const name=document.getElementById("itemName").value.trim();
    const price=document.getElementById("itemPrice").value.trim();
    if(!name||!price){alert("Fill all fields"); return;}
    let items=JSON.parse(localStorage.getItem("buzzify_market")||"[]");
    items.unshift({name:name,price:price,user:localStorage.getItem("buzzify_user")});
    localStorage.setItem("buzzify_market",JSON.stringify(items));
    loadMarket();
}
function loadMarket(){
    const feed=document.getElementById("marketFeed");
    const items=JSON.parse(localStorage.getItem("buzzify_market")||"[]");
    feed.innerHTML="";
    items.forEach(i=>{
        feed.innerHTML+=`<div class="marketItem"><b>${i.name}</b> - $${i.price}<br>Seller: ${i.user}<button onclick="buyItem('${i.name}')">Buy</button></div>`;
    });
}
function buyItem(name){ alert("Transaction successful for "+name); }

// Messaging
function sendMessage(){
    const to=document.getElementById("msgUser").value.trim();
    const text=document.getElementById("msgText").value.trim();
    if(!to||!text){alert("Fill all fields"); return;}
    let msgs=JSON.parse(localStorage.getItem("buzzify_msgs")||"[]");
    msgs.push({from:localStorage.getItem("buzzify_user"),to:to,text:text,time:new Date().toLocaleString()});
    localStorage.setItem("buzzify_msgs",JSON.stringify(msgs));
    loadMessages();
}
function loadMessages(){
    const feed=document.getElementById("messageFeed");
    const msgs=JSON.parse(localStorage.getItem("buzzify_msgs")||"[]");
    const user=localStorage.getItem("buzzify_user");
    feed.innerHTML="";
    msgs.forEach(m=>{
        if(m.from===user||m.to===user){
            feed.innerHTML+=`<div class="messageItem"><b>${m.from} → ${m.to}</b><p>${m.text}</p><small>${m.time}</small></div>`;
        }
    });
}

// Profile
function loadProfile(){
    document.getElementById("profileInfo").innerHTML=
    `<p><b>Username:</b> ${localStorage.getItem("buzzify_user")}</p>
    <p><b>Bio:</b> ${localStorage.getItem("buzzify_bio")||''}</p>`;
}
function updateProfile(){
    const pic=document.getElementById("profilePic").value.trim();
    const bio=document.getElementById("profileBio").value.trim();
    if(pic) localStorage.setItem("buzzify_pic",pic);
    if(bio) localStorage.setItem("buzzify_bio",bio);
    loadProfile();
    alert("Profile updated!");
}
