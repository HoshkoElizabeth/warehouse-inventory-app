import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../hooks/useFavorites';
import InventoryCard from '../components/gallery/InventoryCard';
import InventoryQuickView from '../components/gallery/InventoryQuickView';

export default function Favorites() {
    const { favorites, toggleFavorite, isFavorite } = useFavorites();
    const [selectedId, setSelectedId] = useState(null);

    return (
        <div style={{ minHeight: '100vh', background: 'transparent' }}>
            <style>{`
        .fav-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 24px;
        }
        @media (max-width: 600px) {
          .fav-grid { grid-template-columns: 1fr 1fr; gap: 12px; }
        }
      `}</style>

            {/* Шапка */}
            <div style={{
                background: 'var(--header-bg)', borderBottom: '1px solid var(--border-color)',
                padding: '16px 24px',
                display: 'flex', gap: 20, alignItems: 'center',
            }}>
                <Link to="/gallery" style={{
                    display: 'inline-block', padding: '8px 16px',
                    background: 'transparent', color: 'var(--text-main)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 8, textDecoration: 'none', fontSize: 14,
                    fontWeight: 500, cursor: 'pointer'
                }}>
                    ← Назад до галереї
                </Link>
                <h1 style={{ margin: 0, fontSize: 20, color: 'var(--text-main)' }}>Улюблені</h1>
                <span style={{ color: 'var(--text-muted)', fontSize: 14 }}>
                    {favorites.length} {favorites.length === 1 ? 'елемент' : 'елементів'}
                </span>
            </div>

            {/* Контент */}
            <div style={{ maxWidth: 1200, margin: '0 auto', padding: '28px 16px' }}>
                {favorites.length === 0 ? (
                    /* Empty state */
                    <div style={{ textAlign: 'center', padding: 80, color: 'var(--text-muted)' }}>
                        <p style={{ fontSize: 18, margin: '0 0 16px' }}>Улюблені порожні</p>
                        <p style={{ fontSize: 14, margin: '0 0 24px' }}>
                            Натисніть кнопку на картці у галереї, щоб додати елемент
                        </p>
                        <Link
                            to="/gallery"
                            style={{
                                display: 'inline-block', padding: '10px 24px',
                                background: '#1976d2', color: '#fff',
                                borderRadius: 8, textDecoration: 'none', fontSize: 14,
                            }}
                        >
                            Перейти до галереї
                        </Link>
                    </div>
                ) : (
                    <div className="fav-grid">
                        {favorites.map(item => (
                            <InventoryCard
                                key={item.id}
                                item={item}
                                isFav={isFavorite(item.id)}
                                onToggleFav={toggleFavorite}
                                onClick={() => setSelectedId(item.id)}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Quick View */}
            {selectedId && (
                <InventoryQuickView
                    itemId={selectedId}
                    onClose={() => setSelectedId(null)}
                />
            )}
        </div>
    );
}