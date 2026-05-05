import { useEffect, useState } from 'react';
import { getInventoryById, getPhotoUrl } from '../../services/inventoryApi';

export default function InventoryQuickView({ itemId, onClose }) {
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getInventoryById(itemId)
            .then(setItem)
            .finally(() => setLoading(false));
    }, [itemId]);

    // Закрити по Escape
    useEffect(() => {
        const handler = (e) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [onClose]);

    return (
        // Темний фон
        <div
            onClick={onClose}
            style={{
                position: 'fixed', inset: 0,
                background: 'rgba(0,0,0,0.65)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                zIndex: 999,
                animation: 'fadeIn 0.2s ease',
            }}
        >
            <style>{`@keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }`}</style>

            {/* Картка */}
            <div
                onClick={e => e.stopPropagation()}
                style={{
                    background: '#fff', borderRadius: 20,
                    maxWidth: 520, width: '92%',
                    overflow: 'hidden',
                    boxShadow: '0 16px 48px rgba(0,0,0,0.3)',
                    animation: 'slideUp 0.2s ease',
                }}
            >
                <style>{`@keyframes slideUp { from { transform: translateY(20px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }`}</style>

                {loading ? (
                    <div style={{ padding: 48, textAlign: 'center', color: '#aaa' }}>
                        ⏳ Завантаження...
                    </div>
                ) : item ? (
                    <>
                        {/* Фото */}
                        <img
                            src={getPhotoUrl(itemId)}
                            alt={item.inventory_name}
                            style={{ width: '100%', height: 280, objectFit: 'cover', display: 'block' }}
                            onError={e => {
                                e.target.src = 'https://placehold.co/520x280?text=Фото+відсутнє';
                            }}
                        />

                        {/* Текст */}
                        <div style={{ padding: '20px 24px 16px' }}>
                            <h2 style={{ margin: '0 0 10px', fontSize: 22 }}>{item.inventory_name}</h2>
                            <p style={{ margin: 0, color: '#666', lineHeight: 1.6, fontSize: 15 }}>
                                {item.description || <em>Опис відсутній</em>}
                            </p>
                        </div>
                    </>
                ) : (
                    <div style={{ padding: 32 }}>Елемент не знайдено</div>
                )}

                {/* Кнопка закрити */}
                <button
                    onClick={onClose}
                    style={{
                        display: 'block', width: '100%',
                        padding: '14px', border: 'none',
                        borderTop: '1px solid #f0f0f0',
                        background: 'transparent', cursor: 'pointer',
                        fontSize: 14, color: '#888',
                    }}
                >
                    Закрити (або натисни Esc)
                </button>
            </div>
        </div>
    );
}