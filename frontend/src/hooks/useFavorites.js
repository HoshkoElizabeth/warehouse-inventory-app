import { useState, useEffect } from 'react';

const STORAGE_KEY = 'warehouse_favorites';

export function useFavorites() {
    // Ініціалізуємо з localStorage
    const [favorites, setFavorites] = useState(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            return stored ? JSON.parse(stored) : [];
        } catch {
            return [];
        }
    });

    // Синхронізуємо з localStorage при кожній зміні
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    }, [favorites]);

    // Додати або видалити з улюблених
    const toggleFavorite = (item) => {
        setFavorites(prev => {
            const exists = prev.find(f => f.id === item.id);
            if (exists) {
                return prev.filter(f => f.id !== item.id); // Видалити
            } else {
                return [...prev, item]; // Додати
            }
        });
    };

    // Перевірити чи в улюблених
    const isFavorite = (id) => favorites.some(f => f.id === id);

    return { favorites, toggleFavorite, isFavorite };
}