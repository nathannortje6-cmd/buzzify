/* ----------------- SCREEN NAVIGATION ----------------- */
function showScreen(id){
    document.querySelectorAll('.mainScreen').forEach(s=>s.classList.add('hidden'));
    document.getElementById(id).classList.remove('hidden');
}

/* ----------------- LOGIN/SIGNUP ----------------- */
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
        loadHome(); loadVideos(); loadMarket(); loadMessages(); loadProfile();
    } else { alert("Incorrect credentials"); }
}

/* ----------------- POSTS ----------------- */
function loadHome(){
    const feed=document.getElementById("homeFeed");
    const posts=JSON.parse(localStorage.getItem("buzzify_posts")||"[]");
    feed.innerHTML="";
    posts.forEach(p=>{
        let type=p.type==='video'?`<video src="${p.content}" controls style="width:100%;border-radius:15px;"></video>`:`<img src="${p.content}" style="width:100%;border-radius:15px;">`;
        feed.innerHTML+=`<div class="post"><div class="postHeader"><img src="${localStorage.getItem("buzzify_pic")||'https://i.ibb.co/6NX5vTq/default-avatar.png'}" class="avatar"><b>${p.user}</b></div>${type}</div>`;
    });
}
function loadVideos(){
    const feed=document.getElementById("videoFeed");
    const posts=JSON.parse(localStorage.getItem("buzzify_posts")||"[]");
    feed.innerHTML="";
    posts.filter(p=>p.type==='video').forEach(p=>{
        feed.innerHTML+=`<div class="post"><div class="postHeader"><img src="${localStorage.getItem("buzzify_pic")||'https://i.ibb.co/6NX5vTq/default-avatar.png'}" class="avatar"><b>${p.user}</b></div><video src="${p.content}" controls style="width:100%;border-radius:15px;"></video></div>`;
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

/* ----------------- MARKETPLACE ----------------- */
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

/* ----------------- MESSAGES ----------------- */
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
            let cls=m.from===user?"you":"other";
            feed.innerHTML+=`<div class="messageItem ${cls}"><b>${m.from} → ${m.to}</b><p>${m.text}</p><small>${m.time}</small></div>`;
        }
    });
}

/* ----------------- PROFILE ----------------- */
function loadProfile(){
    document.getElementById("profileInfo").innerHTML=
    `<p><b>Username:</b> ${localStorage.getItem("buzzify_user")}</p>
     <p><b>Bio:</b> ${localStorage.getItem("buzzify_bio")||''}</p>
     <p><b>Profile Pic:</b> <img src="${localStorage.getItem("buzzify_pic")||'https://i.ibb.co/6NX5vTq/default-avatar.png'}" class="avatar"></p>`;
}
function updateProfile(){
    const pic=document.getElementById("profilePic").value.trim();
    const bio=document.getElementById("profileBio").value.trim();
    if(pic) localStorage.setItem("buzzify_pic",pic);
    if(bio) localStorage.setItem("buzzify_bio",bio);
    loadProfile();
    alert("Profile updated!");
}
