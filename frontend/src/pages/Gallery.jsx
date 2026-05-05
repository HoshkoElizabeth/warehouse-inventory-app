import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getInventory } from '../services/inventoryApi';
import InventoryCard from '../components/gallery/InventoryCard';
import InventoryQuickView from '../components/gallery/InventoryQuickView';
import { useFavorites } from '../hooks/useFavorites';

// Skeleton — анімований плейсхолдер
function SkeletonCard() {
    return (
        <div style={{
            borderRadius: 16, overflow: 'hidden',
            background: 'var(--card-bg)',
            border: '1px solid var(--border-color)',
        }}>
            <div style={{
                height: 200, background: 'var(--border-color)',
                animation: 'shimmer 1.5s ease-in-out infinite',
            }} />
            <div style={{ padding: '14px 16px' }}>
                <div style={{
                    height: 16, width: '65%', borderRadius: 8,
                    background: 'var(--border-color)',
                    animation: 'shimmer 1.5s ease-in-out infinite',
                }} />
                <div style={{
                    height: 12, width: '40%', borderRadius: 8,
                    background: 'var(--border-color)', marginTop: 8,
                    animation: 'shimmer 1.5s ease-in-out infinite 0.2s',
                }} />
            </div>
        </div>
    );
}

export default function Gallery() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedId, setSelectedId] = useState(null);

    const { favorites, toggleFavorite, isFavorite } = useFavorites();

    useEffect(() => {
        getInventory()
            .then(setItems)
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div style={{ minHeight: '100vh', background: 'transparent' }}>
            <style>{`
        @keyframes shimmer {
          0%, 100% { opacity: 1 }
          50% { opacity: 0.5 }
        }
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 24px;
        }
        @media (max-width: 600px) {
          .gallery-grid { grid-template-columns: 1fr 1fr; gap: 12px; }
        }
        @media (max-width: 400px) {
          .gallery-grid { grid-template-columns: 1fr; }
        }
      `}</style>

            {/* Шапка */}
            <div style={{
                background: 'var(--header-bg)', borderBottom: '1px solid var(--border-color)',
                padding: '16px 24px',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                position: 'sticky', top: 0, zIndex: 10,
                boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
            }}>
                <h1 style={{ margin: 0, fontSize: 20 }}>Склад — Галерея</h1>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <Link to="/admin" style={btnOutlineStyle}>Адмін-панель</Link>
                    <Link to="/favorites" style={btnPrimaryStyle}>
                        Улюблені ({favorites.length})
                    </Link>
                </div>
            </div>

            {/* Контент */}
            <div style={{ maxWidth: 1200, margin: '0 auto', padding: '28px 16px' }}>

                {/* Помилка */}
                {error && (
                    <div style={{
                        padding: 20, background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: 10,
                        color: '#c62828', marginBottom: 24,
                    }}>
                        {error}
                    </div>
                )}

                {/* Сітка */}
                <div className="gallery-grid">
                    {loading
                        ? Array(8).fill(0).map((_, i) => <SkeletonCard key={i} />)
                        : items.length === 0
                            ? (
                                <div style={{
                                    gridColumn: '1 / -1', textAlign: 'center',
                                    padding: 80, color: 'var(--text-muted)',
                                }}>
                                    <p style={{ fontSize: 18 }}>Інвентар порожній</p>
                                    <Link to="/admin" style={{ ...btnPrimaryStyle, marginTop: 16 }}>Перейти до адмін-панелі</Link>
                                </div>
                            )
                            : items.map(item => (
                                <InventoryCard
                                    key={item.id}
                                    item={item}
                                    isFav={isFavorite(item.id)}
                                    onToggleFav={toggleFavorite}
                                    onClick={() => setSelectedId(item.id)}
                                />
                            ))
                    }
                </div>
            </div>

            {/* Quick View Modal */}
            {selectedId && (
                <InventoryQuickView
                    itemId={selectedId}
                    onClose={() => setSelectedId(null)}
                />
            )}
        </div>
    );
}

const btnOutlineStyle = {
    display: 'inline-block', padding: '8px 16px',
    background: 'transparent', color: 'var(--text-main)',
    border: '1px solid var(--border-color)',
    borderRadius: 8, textDecoration: 'none', fontSize: 14,
    fontWeight: 500, cursor: 'pointer',
};

const btnPrimaryStyle = {
    display: 'inline-block', padding: '8px 16px',
    background: '#1976d2', color: '#fff',
    border: 'none', borderRadius: 8, textDecoration: 'none', 
    fontSize: 14, fontWeight: 500, cursor: 'pointer',
};