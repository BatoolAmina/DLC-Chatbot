const chatBox = document.getElementById("chat-box");
const inputBox = document.getElementById("user-input");
const chatForm = document.getElementById("chat-form");

function addMessage(text, sender) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message", sender);
  messageDiv.textContent = text;
  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

async function sendMessage(message) {
  addMessage(message, "user");

  try {
    const res = await fetch("http://localhost:3000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    if (!res.ok) throw new Error("Network response was not ok");

    const data = await res.json();
    addMessage(data.reply, "bot");
  } catch (err) {
    addMessage("⚠️ Sorry, something went wrong. Please try again later.", "bot");
    console.error(err);
  }
}

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const msg = inputBox.value.trim();
  if (msg === "") return;
  sendMessage(msg);
  inputBox.value = "";
  inputBox.focus();
});
