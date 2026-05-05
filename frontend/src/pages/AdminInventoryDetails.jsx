import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getInventoryById, getPhotoUrl } from '../services/inventoryApi';

export default function AdminInventoryDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getInventoryById(id)
            .then(setItem)
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <p style={{ padding: 24 }}>Завантаження...</p>;
    if (!item) return <p style={{ padding: 24 }}>Елемент не знайдено</p>;

    return (
        <div style={{ maxWidth: 700, margin: '0 auto', padding: '24px 16px' }}>
            <button onClick={() => navigate('/admin')} style={backBtn}>
                ← Назад до списку
            </button>

            <div style={{
                marginTop: 16, background: '#fff', borderRadius: 16,
                boxShadow: '0 2px 12px rgba(0,0,0,0.08)', overflow: 'hidden',
                color: '#333'
            }}>
                {/* Фото */}
                <img
                    src={getPhotoUrl(id)}
                    alt={item.inventory_name}
                    style={{ width: '100%', maxHeight: 400, objectFit: 'cover', display: 'block' }}
                    onError={e => {
                        e.target.src = 'https://placehold.co/700x300?text=Фото+відсутнє';
                    }}
                />

                {/* Інформація */}
                <div style={{ padding: 24 }}>
                    <h1 style={{ margin: '0 0 8px', fontSize: 26 }}>{item.inventory_name}</h1>
                    <p style={{ color: '#666', lineHeight: 1.6, margin: 0 }}>
                        {item.description || <em>Опис відсутній</em>}
                    </p>

                    <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
                        <button
                            onClick={() => navigate(`/admin/${id}/edit`)}
                            style={btnPrimary}
                        >
                            Редагувати
                        </button>
                        <button onClick={() => navigate('/admin')} style={btnOutline}>
                            Назад
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

const backBtn = {
    background: 'none', border: 'none', color: '#1976d2',
    cursor: 'pointer', fontSize: 14, padding: 0,
};
const btnPrimary = {
    padding: '10px 20px', background: '#1976d2', color: '#fff',
    border: 'none', borderRadius: 8, cursor: 'pointer',
};
const btnOutline = {
    padding: '10px 20px', background: 'transparent',
    border: '1px solid #ddd', borderRadius: 8, cursor: 'pointer',
    color: '#333'
};