const BASE_URL = 'http://localhost:3001';

// Отримати всі елементи
export const getInventory = async () => {
    const res = await fetch(`${BASE_URL}/inventory`);
    if (!res.ok) throw new Error('Помилка отримання інвентарю');
    return res.json();
};

// Отримати один елемент за ID
export const getInventoryById = async (id) => {
    const res = await fetch(`${BASE_URL}/inventory/${id}`);
    if (!res.ok) throw new Error('Елемент не знайдено');
    return res.json();
};

// Створити новий елемент (FormData з фото)
export const createInventory = async (formData) => {
    const res = await fetch(`${BASE_URL}/register`, {
        method: 'POST',
        body: formData, // НЕ вказуємо Content-Type — браузер сам встановить multipart
    });
    if (!res.ok) throw new Error('Помилка створення');
    return res.json();
};

// Оновити текстові дані (JSON)
export const updateInventory = async (id, data) => {
    const res = await fetch(`${BASE_URL}/inventory/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Помилка оновлення');
    return res.json();
};

// Оновити фото (FormData)
export const updateInventoryPhoto = async (id, formData) => {
    const res = await fetch(`${BASE_URL}/inventory/${id}/photo`, {
        method: 'PUT',
        body: formData,
    });
    if (!res.ok) throw new Error('Помилка оновлення фото');
    return res.json();
};

// Видалити елемент
export const deleteInventory = async (id) => {
    const res = await fetch(`${BASE_URL}/inventory/${id}`, {
        method: 'DELETE',
    });
    if (!res.ok) throw new Error('Помилка видалення');
    return res.json();
};

// URL фото для тегу <img>
export const getPhotoUrl = (id) => `${BASE_URL}/inventory/${id}/photo`;