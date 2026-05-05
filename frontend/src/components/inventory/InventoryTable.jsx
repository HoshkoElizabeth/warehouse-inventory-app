import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInventory } from '../../store/InventoryContext';
import { getPhotoUrl } from '../../services/inventoryApi';

export default function InventoryTable({ onDeleteClick }) {
    const { items, loading, error, fetchItems } = useInventory();
    const navigate = useNavigate();

    // Завантажуємо при монтуванні
    useEffect(() => {
        fetchItems();
    }, [fetchItems]);

    // ── Стани ──
    if (loading) {
        return (
            <div style={{ textAlign: 'center', padding: 40, color: '#888' }}>
                Завантаження...
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ padding: 20, background: '#fde8e8', borderRadius: 8, color: '#c62828' }}>
                {error}
            </div>
        );
    }

    if (items.length === 0) {
        return (
            <div style={{ textAlign: 'center', padding: 60, color: '#aaa' }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}></div>
                <p>Інвентар порожній. Додайте першу позицію!</p>
            </div>
        );
    }

    // ── Таблиця ──
    return (
        <div style={{ overflowX: 'auto' }}>
            <table style={{
                width: '100%', borderCollapse: 'collapse',
                background: '#fff', borderRadius: 12, overflow: 'hidden',
                boxShadow: '0 1px 8px rgba(0,0,0,0.08)',
                color: '#333'
            }}>
                <thead>
                    <tr style={{ background: '#f8f9fa', borderBottom: '2px solid #e9ecef' }}>
                        <th style={th}>Назва</th>
                        <th style={th}>Опис</th>
                        <th style={th}>Фото</th>
                        <th style={th}>Дії</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, idx) => (
                        <tr
                            key={item.id}
                            style={{
                                borderBottom: '1px solid #f0f0f0',
                                background: idx % 2 === 0 ? '#fff' : '#fafafa',
                                color: '#333'
                            }}
                        >
                            <td style={td}>
                                <strong>{item.inventory_name}</strong>
                            </td>
                            <td style={{ ...td, color: '#666', maxWidth: 200 }}>
                                {item.description || <em style={{ color: '#bbb' }}>— немає опису —</em>}
                            </td>
                            <td style={td}>
                                <img
                                    src={getPhotoUrl(item.id)}
                                    alt={item.inventory_name}
                                    width={64} height={64}
                                    style={{ objectFit: 'cover', borderRadius: 8, display: 'block' }}
                                    onError={e => {
                                        e.target.style.display = 'none';
                                    }}
                                />
                            </td>
                            <td style={{ ...td, whiteSpace: 'nowrap' }}>
                                <button
                                    onClick={() => navigate(`/admin/${item.id}`)}
                                    style={btnOutline}
                                >
                                    Переглянути
                                </button>
                                <button
                                    onClick={() => navigate(`/admin/${item.id}/edit`)}
                                    style={{ ...btnOutline, marginLeft: 6 }}
                                >
                                    Редагувати
                                </button>
                                <button
                                    onClick={() => onDeleteClick(item.id)}
                                    style={{ ...btnOutline, marginLeft: 6, color: '#e53935', borderColor: '#e53935' }}
                                >
                                    Видалити
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

// Стилі
const th = {
    padding: '12px 16px', textAlign: 'left',
    fontWeight: 600, color: '#333', fontSize: 13,
};
const td = { padding: '12px 16px', verticalAlign: 'middle', fontSize: 14, color: '#333' };
const btnOutline = {
    padding: '5px 10px', borderRadius: 6, border: '1px solid #ddd',
    background: 'transparent', cursor: 'pointer', fontSize: 12,
    color: '#333'
};