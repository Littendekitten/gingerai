const sidebar = document.getElementById('sidebar');
const openSidebarBtn = document.getElementById('open-sidebar');
const closeSidebarBtn = document.getElementById('close-sidebar');
const newChatBtn = document.getElementById('new-chat');
const chatList = document.getElementById('chat-list');
const messagesDiv = document.getElementById('messages');
const input = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');

let chats = {};
let currentChat = null;

// Sidebar toggle
openSidebarBtn.addEventListener('click', () => sidebar.classList.remove('closed'));
closeSidebarBtn.addEventListener('click', () => sidebar.classList.add('closed'));

// Create new chat
function createNewChat(name) {
    const chatId = Date.now().toString();
    chats[chatId] = { name: name || `Chat ${Object.keys(chats).length+1}`, messages: [] };
    currentChat = chatId;
    renderChatList();
    renderMessages();
    sidebar.classList.add('closed');
}

newChatBtn.addEventListener('click', () => createNewChat());

// Render chat list
function renderChatList() {
    chatList.innerHTML = '';
    Object.keys(chats).forEach(id => {
        const li = document.createElement('li');
        li.textContent = chats[id].name;
        li.addEventListener('click', () => {
            currentChat = id;
            renderMessages();
            sidebar.classList.add('closed');
        });

        const delBtn = document.createElement('button');
        delBtn.textContent = '🗑';
        delBtn.addEventListener('click', e => {
            e.stopPropagation();
            delete chats[id];
            if(currentChat === id) currentChat = null;
            renderChatList();
            renderMessages();
        });
        li.appendChild(delBtn);
        chatList.appendChild(li);
    });
}

// Render messages
function renderMessages() {
    messagesDiv.innerHTML = '';
    if(!currentChat) return;
    chats[currentChat].messages.forEach(m => {
        const div = document.createElement('div');
        div.classList.add('message', m.sender);
        div.textContent = m.text;
        messagesDiv.appendChild(div);
    });
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// Send message
async function sendMessage() {
    const text = input.value.trim();
    if(!text) return;
    if(!currentChat) createNewChat();
    chats[currentChat].messages.push({ sender: 'user', text });
    input.value = '';
    renderMessages();

    try {
        const response = await window.GingerAI.ask(text);
        chats[currentChat].messages.push({ sender: 'ginger', text: response });
        renderMessages();
    } catch(e) {
        chats[currentChat].messages.push({ sender: 'ginger', text: 'Error: GingerAI unavailable.' });
        renderMessages();
    }
}

sendBtn.addEventListener('click', sendMessage);
input.addEventListener('keydown', e => { if(e.key==='Enter') sendMessage(); });
