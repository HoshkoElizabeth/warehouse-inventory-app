import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InventoryTable from '../components/inventory/InventoryTable';
import ConfirmModal from '../components/inventory/ConfirmModal';
import { deleteInventory } from '../services/inventoryApi';
import { useInventory } from '../store/InventoryContext';

export default function AdminInventory() {
    const [deleteId, setDeleteId] = useState(null);
    const { fetchItems } = useInventory();
    const navigate = useNavigate();

    // Підтвердження видалення
    const handleConfirmDelete = async () => {
        try {
            await deleteInventory(deleteId);
            await fetchItems(); // Оновлюємо список
        } catch (err) {
            alert('Помилка видалення: ' + err.message);
        } finally {
            setDeleteId(null);
        }
    };

    return (
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '24px 16px' }}>
            {/* Шапка */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <div>
                    <h1 style={{ margin: 0, fontSize: 24 }}>📦 Управління інвентарем</h1>
                    <p style={{ margin: '4px 0 0', color: '#888', fontSize: 14 }}>Адміністративна панель</p>
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                    <button
                        onClick={() => navigate('/gallery')}
                        style={btnOutline}
                    >
                        🖼 Галерея
                    </button>
                    <button
                        onClick={() => navigate('/admin/create')}
                        style={btnPrimary}
                    >
                        + Додати позицію
                    </button>
                </div>
            </div>

            {/* Таблиця */}
            <InventoryTable onDeleteClick={setDeleteId} />

            {/* Модальне вікно підтвердження */}
            {deleteId && (
                <ConfirmModal
                    message="Ви справді хочете видалити цей елемент? Цю дію неможливо скасувати."
                    onConfirm={handleConfirmDelete}
                    onCancel={() => setDeleteId(null)}
                />
            )}
        </div>
    );
}

const btnPrimary = {
    padding: '9px 20px', background: '#1976d2', color: '#fff',
    border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: 14,
};
const btnOutline = {
    padding: '9px 20px', background: 'transparent',
    border: '1px solid #ddd', borderRadius: 8, cursor: 'pointer', fontSize: 14,
};