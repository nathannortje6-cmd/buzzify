<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>💜 Buzzify</title>
<link rel="stylesheet" href="style.css">
</head>
<body>

<!-- LOGIN PAGE -->
<div id="loginPage" class="screen">
    <h1>💜 Buzzify</h1>
    <h2>Login</h2>
    <input id="loginUser" type="text" placeholder="Username">
    <input id="loginPass" type="password" placeholder="Password">
    <button onclick="login()">Login</button>
    <button class="linkBtn" onclick="showSignup()">Create Account</button>
</div>

<!-- SIGNUP PAGE -->
<div id="signupPage" class="screen hidden">
    <h1>💜 Buzzify</h1>
    <h2>Create Account</h2>
    <input id="newUser" type="text" placeholder="Username">
    <input id="newPass" type="password" placeholder="Password">
    <input id="newBio" type="text" placeholder="Short Bio">
    <button onclick="signup()">Sign Up</button>
    <button class="linkBtn" onclick="showLogin()">Back to Login</button>
</div>

<!-- MAIN APP -->
<div id="appPage" class="screen hidden">

    <!-- HOME SCREEN -->
    <div id="homeScreen" class="mainScreen">
        <div id="homeFeed"></div>
    </div>

    <!-- VIDEOS SCREEN -->
    <div id="videosScreen" class="mainScreen hidden">
        <div id="videoFeed"></div>
    </div>

    <!-- UPLOAD SCREEN -->
    <div id="uploadScreen" class="mainScreen hidden">
        <div id="uploadArea" class="uploadArea" onclick="document.getElementById('uploadFile').click()">
            <input type="file" id="uploadFile" accept="image/*,video/*" hidden onchange="uploadPost()">
        </div>
        <div id="uploadPreview" class="postsGallery"></div>
    </div>

    <!-- MARKETPLACE SCREEN -->
    <div id="marketScreen" class="mainScreen hidden">
        <div id="marketUploadArea" class="uploadArea" onclick="document.getElementById('itemPhoto').click()">
            <input type="file" id="itemPhoto" accept="image/*" hidden>
        </div>
        <input type="text" id="itemName" placeholder="Item Name">
        <input type="number" id="itemPrice" placeholder="Price">
        <button onclick="addItem()">List Item</button>
        <div id="marketFeed" class="postsGallery"></div>
    </div>

    <!-- MESSAGES SCREEN -->
    <div id="messagesScreen" class="mainScreen hidden">
        <div id="userList" class="userList"></div>
        <div id="chatScreen" class="chatScreen hidden">
            <button onclick="closeChat()">← Back</button>
            <h3 id="chatUser"></h3>
            <div id="chatMessages" class="chatMessages"></div>
            <input id="chatInput" type="text" placeholder="Type a message">
            <button onclick="sendChatMessage()">Send</button>
        </div>
    </div>

    <!-- PROFILE SCREEN -->
    <div id="profileScreen" class="mainScreen hidden">
        <div id="profileHeader">
            <img id="profileAvatar" src="https://i.ibb.co/6NX5vTq/default-avatar.png" class="avatarLarge">
            <button class="editBtn" onclick="updateProfilePic()">Change Profile Picture</button>
            <h3 id="profileUsername"></h3>
            <p id="profileBioText"></p>
            <button class="editBtn" onclick="editBio()">Edit Bio</button>
        </div>
        <div id="profilePosts" class="postsGallery"></div>
    </div>

    <!-- BOTTOM NAVIGATION -->
    <div id="bottomNav">
        <button onclick="showScreen('homeScreen')" class="navBtn" title="Home">
            <svg width="24" height="24" fill="none" stroke="#dcd6f7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 9L12 2l9 7v11a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-5H9v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9z"/>
            </svg>
        </button>
        <button onclick="showScreen('videosScreen')" class="navBtn" title="Videos">
            <svg width="24" height="24" fill="none" stroke="#dcd6f7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="5 3 19 12 5 21 5 3"/>
            </svg>
        </button>
        <button onclick="showScreen('uploadScreen')" class="navBtn" title="Upload">
            <svg width="24" height="24" fill="none" stroke="#dcd6f7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"/>
                <line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
        </button>
        <button onclick="showScreen('marketScreen')" class="navBtn" title="Marketplace">
            <svg width="24" height="24" fill="none" stroke="#dcd6f7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2"/>
                <path d="M3 9h18"/>
            </svg>
        </button>
        <button onclick="showScreen('messagesScreen')" class="navBtn" title="Messages">
            <svg width="24" height="24" fill="none" stroke="#dcd6f7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z"/>
            </svg>
        </button>
        <button onclick="showScreen('profileScreen')" class="navBtn" title="Profile">
            <svg width="24" height="24" fill="none" stroke="#dcd6f7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="7" r="4"/>
                <path d="M5.5 21a6.5 6.5 0 0 1 13 0"/>
            </svg>
        </button>
    </div>

</div>

<script src="script.js"></script>
</body>
</html>
