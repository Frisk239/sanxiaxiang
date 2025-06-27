const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const port = 3000;

// 数据库初始化
const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error('数据库连接错误:', err.message);
    } else {
        console.log('成功连接到SQLite数据库');
        initDatabase();
    }
});

function initDatabase() {
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS game_progress (
        user_id INTEGER,
        event_id TEXT,
        progress INTEGER,
        FOREIGN KEY(user_id) REFERENCES users(id),
        PRIMARY KEY(user_id, event_id)
    )`);
}

// 中间件
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// API路由
app.get('/api/events', (req, res) => {
    res.sendFile(path.join(__dirname, 'events.json'));
});

// 启动服务器
app.listen(port, () => {
    console.log(`服务器运行在 http://localhost:${port}`);
});
