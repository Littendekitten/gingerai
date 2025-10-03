const chatBox = document.getElementById("chatBox");

function sendMessage() {
    const userInput = document.getElementById("userInput");
    const text = userInput.value.trim();
    if(!text) return;

    addMessage("Jij", text);
    const reply = generateReply(text);
    setTimeout(() => addMessage("GingerAI", reply), 300);

    userInput.value = "";
    chatBox.scrollTop = chatBox.scrollHeight;
}

function addMessage(sender, text) {
    const p = document.createElement("p");
    p.innerHTML = `<b>${sender}:</b> ${text}`;
    chatBox.appendChild(p);
}

function generateReply(msg) {
    msg = msg.toLowerCase();
    if(msg.includes("hallo") || msg.includes("hoi")) return "Hallo! Ik ben GingerAI!";
    if(msg.includes("hoe gaat")) return "Met mij gaat het goed! En met jou?";
    if(msg.includes("naam")) return "Ik heet GingerAI!";
    if(msg.includes("dag") || msg.includes("tot ziens")) return "Tot ziens! Fijne dag!";
    // fallback
    return "Sorry, dat begrijp ik nog niet helemaal.";
}
