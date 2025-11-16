# 🕹️ Tic-Tac-Toe AI (Unbeatable Minimax)

A classic game of Tic-Tac-Toe (Noughts and Crosses) built for the web, featuring an unbeatable AI opponent powered by the **Minimax Algorithm**.

This project provides a sleek, modern, and fully responsive user experience with a dynamic dark/light theme toggle.

---
Deployed : https://tic-tac-toe-min-max.vercel.app/
---

## ✨ Features

* **Unbeatable AI:** The opponent uses the **Minimax algorithm** to play optimally, ensuring the best possible move in every situation (the game will always end in a win or a draw against the AI).

* **Symbol Selection:** Choose to play as **X** or **O**.

* **Responsive Design:** Optimized for play on all devices (mobile, tablet, and desktop).

* **Theming:** Dynamic **Dark/Light Mode** toggle.

* **Visual Feedback:** Clear visual highlights for winning combinations and game status.

* **Modular Code:** Clean separation of HTML structure, CSS styling (using Tailwind CSS and custom variables), and JavaScript logic (Minimax implementation).

---

## 🚀 How to Play

1. **Start:** Click the "**Play Tic Tac Toe with AI**" button.

2. **Select Symbol:** Choose your desired symbol (**X** or **O**).

3. **Take Turns:** If you choose 'X', you start. If you choose 'O', the AI starts.

4. **Win Condition:** Get three of your symbols in a row (horizontally, vertically, or diagonally) to win.

5. **Draw:** If the board is full and no player has won, the game is a draw.

6. **Reset:** Use the **Reset** button to start a new game without changing symbols.

---

## ⚙️ Technology Stack

* **HTML5:** Structure and content.

* **Tailwind CSS:** Utility-first framework for rapid and responsive styling.

* **Custom CSS:** For theme variables (`:root`, `.light-theme`) and specific game animations (`.beats`, `.winning-cell`).

* **JavaScript (Vanilla JS):** Core game logic, state management, and the **Minimax algorithm implementation**.

* **Font Awesome:** Used for **X** and **O** icons and UI controls.

---

## 🧠 Minimax Algorithm

The AI's intelligence is derived from the Minimax algorithm, a recursive function used to select an optimal move for a player assuming the opponent also plays optimally.

* **Maximizing Player (AI):** Aims to maximize its score (wins are +10).

* **Minimizing Player (Human):** Aims to minimize the AI's score (wins for the human are -10).

* **Draws:** Valued at 0.

By recursively exploring all possible future moves, the AI ensures it never loses if a path to a win or a draw exists.

---

## 🎨 Styling & Theming

The application uses CSS variables to manage the color scheme, allowing for an instant, smooth transition between dark and light themes.

| Variable | Dark Theme Value | Light Theme Value | Description |
| :--- | :--- | :--- | :--- |
| `--bg-color` | `#1a202c` | `#f7fafc` | Main background color |
| `--text-color` | `#ffffff` | `#1a202c` | General text color |
| `--x-color` | `#ef4444` (Red) | `#ef4444` (Red) | Color for the 'X' symbol |
| `--o-color` | `#3b82f6` (Blue) | `#3b82f6` (Blue) | Color for the 'O' symbol |
| `--cell-bg` | Transparent Dark | Transparent Light | Background of game cells |
```eof
