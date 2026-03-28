* { margin: 0; padding: 0; box-sizing: border-box; }

body {
    font-family: "Comic Sans MS", "Chalkboard", "Segoe UI", sans-serif;
    background: linear-gradient(#0a1f2e, #1a0f2e);
    color: #f0f0ff;
    line-height: 1.6;
}

header {
    background: #0f2a3d;
    padding: 1.2rem;
    text-align: center;
    border-bottom: 4px solid #21b96b;
    box-shadow: 0 4px 15px rgba(33, 185, 107, 0.3);
}

h1 {
    font-size: 2.4rem;
    color: #a6e329;
    text-shadow: 0 0 10px #21b96b;
}

.controls {
    margin-top: 1rem;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    justify-content: center;
    align-items: center;
}

.controls button, select {
    padding: 10px 16px;
    background: #1e4a66;
    color: #fff;
    border: 2px solid #21b96b;
    border-radius: 8px;
    cursor: pointer;
    font-weight: bold;
    transition: all 0.2s;
}

.controls button:hover {
    background: #21b96b;
    color: #000;
    transform: scale(1.05);
}

.advance-btn { background: #e94560 !important; border-color: #ff99cc; }
.add-btn { background: #3cb9e1 !important; border-color: #a6e329; }

.main {
    display: flex;
    max-width: 1400px;
    margin: 25px auto;
    gap: 25px;
    padding: 0 25px;
}

.calendar-grid {
    flex: 3;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 8px;
    background: #0f2a3d;
    padding: 12px;
    border-radius: 16px;
    box-shadow: 0 0 20px rgba(33, 185, 107, 0.2);
}

.calendar-grid div {
    background: #1e3a55;
    min-height: 110px;
    padding: 10px;
    border-radius: 12px;
    position: relative;
    cursor: pointer;
    transition: transform 0.2s;
}

.calendar-grid div:hover {
    transform: scale(1.03);
}

.calendar-grid .day-number {
    font-size: 1.3rem;
    font-weight: bold;
    color: #a6e329;
    display: block;
    margin-bottom: 6px;
}

.event {
    font-size: 0.9rem;
    padding: 4px 8px;
    margin: 4px 0;
    border-radius: 6px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: bold;
}

.birthday { background: #ffd700; color: #222; }
.social { background: #3caad6; }
.festival { background: #9b59b6; }
.holiday { background: #e74c3c; }
.custom { background: #21b96b; color: #000; }

.sidebar {
    flex: 1;
    background: #1e3a55;
    padding: 20px;
    border-radius: 16px;
    box-shadow: 0 0 20px rgba(33, 185, 107, 0.2);
}

.sidebar h2 {
    color: #a6e329;
    margin-bottom: 12px;
    text-shadow: 0 0 8px #21b96b;
}

#upcoming-list li {
    margin: 10px 0;
    padding: 10px;
    background: #0f2a3d;
    border-radius: 8px;
}

#sims-list > div {
    margin: 12px 0;
    padding: 14px;
    background: #0f2a3d;
    border-radius: 12px;
    border-left: 6px solid #21b96b;
}

.plumbob {
    display: inline-block;
    color: #21b96b;
    font-size: 1.4rem;
    animation: plumbobPulse 2s infinite ease-in-out;
    margin-right: 6px;
    text-shadow: 0 0 8px #a6e329;
}

@keyframes plumbobPulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.2); }
}

.modal {
    display: none;
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(10, 15, 30, 0.95);
    align-items: center;
    justify-content: center;
    z-index: 100;
}

.modal-content {
    background: #1e3a55;
    padding: 30px;
    border-radius: 16px;
    width: 90%;
    max-width: 440px;
    border: 3px solid #21b96b;
    box-shadow: 0 0 30px rgba(33, 185, 107, 0.5);
}

.modal input, .modal select, .modal textarea {
    width: 100%;
    padding: 12px;
    margin: 10px 0;
    background: #0f2a3d;
    border: 2px solid #3caad6;
    color: #fff;
    border-radius: 8px;
    font-family: inherit;
}

.modal-buttons button {
    padding: 12px 24px;
    margin-right: 10px;
    border-radius: 8px;
    font-weight: bold;
}

.save-btn { background: #21b96b; color: #000; }
.cancel-btn { background: #e74c3c; }
