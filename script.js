/* -------------------------------------------------------
   BUZZIFY MAIN SCRIPT
   Handles: page loading, navigation, data storage
---------------------------------------------------------*/

// GLOBAL PAGE LOADER
function load(page) {
    const app = document.getElementById("app");
    app.classList.add("fade-out");

    setTimeout(() => {
        app.innerHTML = pages[page];
        app.classList.remove("fade-out");
        setActive(page);

        // Run page-specific scripts
        if (page === "profile") loadProfile();
        if (page === "chat") startNearbySimulation();
    }, 180);
}

// HIGHLIGHT ACTIVE NAV BUTTON
function setActive(page) {
    document.querySelectorAll(".nav-item").forEach(n => n.classList.remove("active"));
    document.getElementById(page + "Btn").classList.add("active");
}

/* -------------------------------------------------------
   PAGE TEMPLATES
---------------------------------------------------------*/

const navbar = `
<div class="navbar">
    <div id="homeBtn" class="nav-item" onclick="load('home')">Home</div>
    <div id="marketBtn" class="nav-item" onclick="load('market')">Market</div>
    <div id="chatBtn" class="nav-item" onclick="load('chat')">Nearby</div>
    <div id="profileBtn" class="nav-item" onclick="load('profile')">Profile</div>
</div>
`;

const pages = {
    home: `
        <div class="topbar">Buzzify</div>
        <div class="feed">
            <div class="post">
                <div class="post-username">@nathan</div>
                <div class="post-content">Welcome to Buzzify — the new world of connection 🌍</div>
            </div>

            <div class="post">
                <div class="post-username">@lexi</div>
                <div class="post-content">Who else is loving this new app? 🔥</div>
            </div>

            <div class="post">
                <div class="post-username">@mike</div>
                <div class="post-content">Slide into the Nearby Chat and say hi 👋</div>
            </div>
        </div>
        ${navbar}
    `,

    market: `
        <div class="topbar">Marketplace</div>
        <div class="market">
            <div class="item"><img src="https://i.imgur.com/7QdJfFf.png"><p>Headphones</p></div>
            <div class="item"><img src="https://i.imgur.com/C86hD5R.png"><p>Phone</p></div>
            <div class="item"><img src="https://i.imgur.com/f1K9qP2.png"><p>Sneakers</p></div>
            <div class="item"><img src="https://i.imgur.com/Jwl4I4j.png"><p>Watch</p></div>
        </div>
        ${navbar}
    `,

    chat: `
        <div class="topbar">Nearby Chat</div>
        <div class="nearby-box">
            <p class="nearby-title">People around you:</p>
            <div id="nearbyList" class="nearby-list"></div>
        </div>
        ${navbar}
    `,

    profile: `
        <div class="topbar">My Profile</div>

        <div class="profile">
            <img id="profilePic" src="https://via.placeholder.com/140">
            <h2 id="profileName"></h2>

            <input id="nameInput" type="text" placeholder="Enter your name" class="profile-input">

            <button onclick="saveProfile()" class="save-btn">Save Profile</button>
        </div>

        ${navbar}
    `
};

/* -------------------------------------------------------
   NEARBY USERS SIMULATION
---------------------------------------------------------*/

function startNearbySimulation() {
    const users = [
        { name: "Josh", dist: "320 m" },
        { name: "Amber", dist: "1.2 km" },
        { name: "Keegan", dist: "890 m" },
        { name: "Sasha", dist: "2.1 km" }
    ];

    const list = document.getElementById("nearbyList");
    list.innerHTML = "";

    users.forEach(u => {
        const div = document.createElement("div");
        div.className = "nearby-user";
        div.innerHTML = `
            <strong>${u.name}</strong>
            <span>${u.dist} away</span>
        `;
        list.appendChild(div);
    });
}

/* -------------------------------------------------------
   PROFILE SYSTEM
---------------------------------------------------------*/

function loadProfile() {
    const storedName = localStorage.getItem("buzzify_name") || "Your Name";
    document.getElementById("profileName").innerText = storedName;
    document.getElementById("nameInput").value = storedName;
}

function saveProfile() {
    const name = document.getElementById("nameInput").value;
    if (name.trim() === "") return;

    localStorage.setItem("buzzify_name", name);
    load("profile");
}

/* -------------------------------------------------------
   INIT APP
---------------------------------------------------------*/

document.addEventListener("DOMContentLoaded", () => {
    load("home");
});
