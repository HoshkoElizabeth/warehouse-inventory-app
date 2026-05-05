import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import InventoryForm from '../components/inventory/InventoryForm';
import { getInventoryById, updateInventory, updateInventoryPhoto } from '../services/inventoryApi';

export default function AdminInventoryEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getInventoryById(id)
            .then(setItem)
            .catch(() => alert('Елемент не знайдено'))
            .finally(() => setLoading(false));
    }, [id]);

    const handleSubmit = async (data) => {
        try {
            await updateInventory(id, data);
            navigate('/admin');
        } catch (err) {
            alert('Помилка оновлення: ' + err.message);
        }
    };

    const handlePhotoSubmit = async (formData) => {
        try {
            await updateInventoryPhoto(id, formData);
            navigate('/admin');
        } catch (err) {
            alert('Помилка оновлення фото: ' + err.message);
        }
    };

    if (loading) return <p style={{ padding: 24 }}>Завантаження...</p>;
    if (!item) return <p style={{ padding: 24 }}>Елемент не знайдено</p>;

    return (
        <div style={{ maxWidth: 600, margin: '0 auto', padding: '24px 16px' }}>
            <button onClick={() => navigate('/admin')} style={backBtn}>
                ← Назад до списку
            </button>
            <h1 style={{ marginTop: 12 }}>Редагувати: {item.inventory_name}</h1>
            <InventoryForm
                initialData={item}
                onSubmit={handleSubmit}
                onPhotoSubmit={handlePhotoSubmit}
            />
        </div>
    );
}

const backBtn = {
    background: 'none', border: 'none', color: '#1976d2',
    cursor: 'pointer', fontSize: 14, padding: 0,
};