const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Створи папку для фото якщо не існує
if (!fs.existsSync('./uploads')) fs.mkdirSync('./uploads');

// In-memory база даних (масив)
let inventory = [];

// Налаштування збереження файлів
const storage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
        cb(null, uuidv4() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

// ── МАРШРУТИ ──────────────────────────────────────

// GET /inventory — список всіх
app.get('/inventory', (req, res) => {
    res.json(inventory);
});

// GET /inventory/:id — один елемент
app.get('/inventory/:id', (req, res) => {
    const item = inventory.find(i => i.id === req.params.id);
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json(item);
});

// GET /inventory/:id/photo — фото елементу
app.get('/inventory/:id/photo', (req, res) => {
    const item = inventory.find(i => i.id === req.params.id);
    if (!item || !item.photoPath) return res.status(404).json({ error: 'No photo' });
    res.sendFile(path.resolve(item.photoPath));
});

// POST /register — створити новий (multipart/form-data)
app.post('/register', upload.single('photo'), (req, res) => {
    const { inventory_name, description } = req.body;
    if (!inventory_name || !inventory_name.trim()) {
        return res.status(400).json({ error: "inventory_name є обов'язковим" });
    }
    const item = {
        id: uuidv4(),
        inventory_name: inventory_name.trim(),
        description: description ? description.trim() : '',
        photoPath: req.file ? `./uploads/${req.file.filename}` : null,
    };
    inventory.push(item);
    res.status(201).json(item);
});

// PUT /inventory/:id — оновити текст (JSON)
app.put('/inventory/:id', (req, res) => {
    const idx = inventory.findIndex(i => i.id === req.params.id);
    if (idx === -1) return res.status(404).json({ error: 'Not found' });
    const { inventory_name, description } = req.body;
    if (inventory_name) inventory[idx].inventory_name = inventory_name.trim();
    if (description !== undefined) inventory[idx].description = description.trim();
    res.json(inventory[idx]);
});

// PUT /inventory/:id/photo — оновити фото (multipart/form-data)
app.put('/inventory/:id/photo', upload.single('photo'), (req, res) => {
    const idx = inventory.findIndex(i => i.id === req.params.id);
    if (idx === -1) return res.status(404).json({ error: 'Not found' });
    if (req.file) {
        inventory[idx].photoPath = `./uploads/${req.file.filename}`;
    }
    res.json(inventory[idx]);
});

// DELETE /inventory/:id — видалити
app.delete('/inventory/:id', (req, res) => {
    const idx = inventory.findIndex(i => i.id === req.params.id);
    if (idx === -1) return res.status(404).json({ error: 'Not found' });
    inventory.splice(idx, 1);
    res.json({ success: true });
});

// ── ЗАПУСК ────────────────────────────────────────
app.listen(3001, () => {
    console.log('✅ Backend running on http://localhost:3001');
});