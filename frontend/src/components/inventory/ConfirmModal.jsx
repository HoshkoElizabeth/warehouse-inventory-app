export default function ConfirmModal({ message = 'Ви впевнені?', onConfirm, onCancel }) {
    return (
        // Темний фон
        <div
            onClick={onCancel}
            style={{
                position: 'fixed', inset: 0,
                background: 'rgba(0,0,0,0.5)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                zIndex: 1000,
            }}
        >
            {/* Вікно — кліки не закривають */}
            <div
                onClick={e => e.stopPropagation()}
                style={{
                    background: '#fff', borderRadius: 12, padding: 32,
                    minWidth: 320, maxWidth: 420, boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                }}
            >
                <h3 style={{ margin: '0 0 8px', fontSize: 18 }}>Підтвердження</h3>
                <p style={{ margin: '0 0 24px', color: '#555' }}>{message}</p>

                <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
                    <button
                        onClick={onCancel}
                        style={{
                            padding: '8px 20px', borderRadius: 8, border: '1px solid #ddd',
                            background: '#f5f5f5', cursor: 'pointer', fontSize: 14,
                        }}
                    >
                        Скасувати
                    </button>
                    <button
                        onClick={onConfirm}
                        style={{
                            padding: '8px 20px', borderRadius: 8, border: 'none',
                            background: '#e53935', color: '#fff', cursor: 'pointer', fontSize: 14,
                        }}
                    >
                        Так, видалити
                    </button>
                </div>
            </div>
        </div>
    );
}