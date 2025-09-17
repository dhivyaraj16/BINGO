# BINGO
A fun Memory Matching Game built with HTML, CSS, and JavaScript.
Flip cards to find matching pairs. Challenge yourself with a timer ⏱️, track your moves, and try to beat your best score 🏆.

✨ Features

🔤 Emoji-based cards (cute animals 🐶🐱🐰🦊🐻🐼🐨🐯).

🕒 Timer to track how long it takes you to finish the game.

🧮 Best Score / High Score saved in your browser’s local storage.

🔊 Sound effects for flipping, matching, and winning.

🎉 Confetti animation when you win.

📱 Mobile-responsive design.

📂 Project Structure
memory-card-game/
│
├── index.html      # Main HTML file
├── style.css       # Styling
├── script.js       # Game logic
├── sounds/         # Sound effects (flip.mp3, match.mp3, win.mp3)
└── README.md       # Project documentation

🚀 How to Run

Download or clone this repository:

git clone https://github.com/your-username/memory-card-game.git
cd memory-card-game


Open index.html in your browser.

That’s it! 🎉

🎮 How to Play

Click on a card to flip it.

Flip another card to try and find its match.

If they match ✅ → they stay flipped.

If not ❌ → they flip back after a short delay.

Match all pairs to win!

🛠️ Customization

Change emojis:
Open script.js and edit the emoji list:

const emojis = ['🐶','🐱','🐰','🦊','🐻','🐼','🐨','🐯'];


Change sounds:
Replace the files inside sounds/ with your own audio, keeping the same names (flip.mp3, match.mp3, win.mp3).

Change grid size:
Adjust the grid-template-columns in style.css:

.game-board {
  grid-template-columns: repeat(4, 1fr); /* 4x4 grid */
}
