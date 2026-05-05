import { createContext, useContext, useState, useCallback } from 'react';
import { getInventory } from '../services/inventoryApi';

// Створення контексту
const InventoryContext = createContext(null);

// Провайдер — огортає весь застосунок
export function InventoryProvider({ children }) {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Функція завантаження списку
    const fetchItems = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getInventory();
            setItems(data);
        } catch (err) {
            setError(err.message || 'Помилка завантаження');
        } finally {
            setLoading(false);
        }
    }, []);

    return (
        <InventoryContext.Provider value={{ items, loading, error, fetchItems }}>
            {children}
        </InventoryContext.Provider>
    );
}

// Хук для використання в компонентах
export function useInventory() {
    const ctx = useContext(InventoryContext);
    if (!ctx) throw new Error('useInventory must be used inside InventoryProvider');
    return ctx;
}