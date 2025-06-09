const today = new Date().toISOString().split('T')[0];
document.getElementById("unlockDate").setAttribute("min", today);

// Check if stored message is ready to unlock
window.onload = function () {
  const data = JSON.parse(localStorage.getItem("futureMessage"));
  if (data) {
    const today = new Date().toISOString().split("T")[0];
    if (today >= data.date) {
      document.getElementById("formSection").classList.add("hidden");
      document.getElementById("revealSection").classList.remove("hidden");
      document.getElementById("revealedMessage").innerHTML = `
        <strong>${data.name}</strong>, you wrote:<br><br>
        "${data.message}"<br><br>
        🔓 Unlocked on: ${today}
      `;
    }
  }
};

function lockMessage() {
  const name = document.getElementById("name").value.trim();
  const message = document.getElementById("message").value.trim();
  const date = document.getElementById("unlockDate").value;

  if (!name || !message || !date) {
    alert("Please fill in all fields!");
    return;
  }

  const payload = {
    name: name,
    message: message,
    date: date
  };

  localStorage.setItem("futureMessage", JSON.stringify(payload));
  alert("🎉 Your message has been locked in the time capsule!");
  location.reload();
}
