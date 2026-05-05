import { getPhotoUrl } from '../../services/inventoryApi';

export default function InventoryCard({ item, isFav, onToggleFav, onClick }) {
    return (
        <div
            onClick={onClick}
            style={{
                borderRadius: 16, overflow: 'hidden',
                background: '#fff',
                boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                cursor: 'pointer',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                position: 'relative',
            }}
            onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.08)';
            }}
        >
            {/* Фото */}
            <div style={{ position: 'relative', overflow: 'hidden', height: 200 }}>
                <img
                    src={getPhotoUrl(item.id)}
                    alt={item.inventory_name}
                    style={{
                        width: '100%', height: '100%', objectFit: 'cover',
                        transition: 'transform 0.3s ease',
                        display: 'block',
                    }}
                    onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
                    onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                    onError={e => {
                        e.target.src = 'https://placehold.co/400x200?text=📦+No+Photo';
                    }}
                />
            </div>

            {/* Назва */}
            <div style={{ padding: '14px 16px' }}>
                <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600, color: '#222' }}>
                    {item.inventory_name}
                </h3>
                {item.description && (
                    <p style={{
                        margin: '6px 0 0', fontSize: 13, color: '#888',
                        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                    }}>
                        {item.description}
                    </p>
                )}
            </div>

            {/* Кнопка */}
            <button
                onClick={e => {
                    e.stopPropagation(); // Не відкривати QuickView
                    onToggleFav(item);
                }}
                title={isFav ? 'Видалити з улюблених' : 'Додати до улюблених'}
                style={{
                    position: 'absolute', top: 10, right: 10,
                    width: 36, height: 36,
                    background: 'rgba(255,255,255,0.9)',
                    border: 'none', borderRadius: '50%',
                    cursor: 'pointer', fontSize: 18,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                    transition: 'transform 0.15s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.15)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
                {isFav ? '❤️' : '🤍'}
            </button>
        </div>
    );
}