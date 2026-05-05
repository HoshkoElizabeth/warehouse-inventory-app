import { useNavigate } from 'react-router-dom';
import InventoryForm from '../components/inventory/InventoryForm';
import { createInventory } from '../services/inventoryApi';

export default function AdminInventoryCreate() {
    const navigate = useNavigate();

    const handleSubmit = async (formData) => {
        try {
            await createInventory(formData);
            navigate('/admin');
        } catch (err) {
            alert('Помилка створення: ' + err.message);
        }
    };

    return (
        <div style={{ maxWidth: 600, margin: '0 auto', padding: '24px 16px' }}>
            <button onClick={() => navigate('/admin')} style={backBtn}>
                ← Назад до списку
            </button>
            <h1 style={{ marginTop: 12 }}>Додати нову позицію</h1>
            <InventoryForm onSubmit={handleSubmit} />
        </div>
    );
}

const backBtn = {
    background: 'none', border: 'none', color: '#1976d2',
    cursor: 'pointer', fontSize: 14, padding: 0,
};