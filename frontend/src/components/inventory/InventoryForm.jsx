import { useState } from 'react';

export default function InventoryForm({ initialData = {}, onSubmit, onPhotoSubmit }) {
    const [name, setName] = useState(initialData.inventory_name || '');
    const [desc, setDesc] = useState(initialData.description || '');
    const [photo, setPhoto] = useState(null);
    const [errors, setErrors] = useState({});
    const [photoPreview, setPhotoPreview] = useState(null);

    const isEdit = Boolean(initialData.id);

    // Валідація форми
    const validate = () => {
        const e = {};
        if (!name.trim()) e.name = "Назва є обов'язковою";
        return e;
    };

    // Прев'ю фото при виборі файлу
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setPhoto(file);
        if (file) {
            const url = URL.createObjectURL(file);
            setPhotoPreview(url);
        }
    };

    // Збереження текстових даних
    const handleSubmit = (e) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length > 0) { setErrors(errs); return; }
        setErrors({});

        if (!isEdit) {
            // При створенні — відправляємо FormData з фото
            const fd = new FormData();
            fd.append('inventory_name', name.trim());
            fd.append('description', desc.trim());
            if (photo) fd.append('photo', photo);
            onSubmit(fd);
        } else {
            // При редагуванні — відправляємо JSON
            onSubmit({ inventory_name: name.trim(), description: desc.trim() });
        }
    };

    // Збереження нового фото (тільки при редагуванні)
    const handlePhotoSubmit = (e) => {
        e.preventDefault();
        if (!photo) return;
        const fd = new FormData();
        fd.append('photo', photo);
        onPhotoSubmit(fd);
    };

    return (
        <div style={{ maxWidth: 500 }}>

            {/* ── Основна форма ── */}
            <form onSubmit={handleSubmit}>
                {/* Назва */}
                <div style={{ marginBottom: 16 }}>
                    <label style={labelStyle}>
                        Назва <span style={{ color: 'red' }}>*</span>
                    </label>
                    <input
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Введіть назву..."
                        style={{ ...inputStyle, borderColor: errors.name ? 'red' : '#ddd' }}
                    />
                    {errors.name && (
                        <p style={{ color: 'red', fontSize: 12, margin: '4px 0 0' }}>{errors.name}</p>
                    )}
                </div>

                {/* Опис */}
                <div style={{ marginBottom: 16 }}>
                    <label style={labelStyle}>Опис</label>
                    <textarea
                        value={desc}
                        onChange={e => setDesc(e.target.value)}
                        placeholder="Введіть опис..."
                        rows={3}
                        style={{ ...inputStyle, resize: 'vertical', fontFamily: 'inherit' }}
                    />
                </div>

                {/* Фото — тільки при створенні */}
                {!isEdit && (
                    <div style={{ marginBottom: 20 }}>
                        <label style={labelStyle}>Фото</label>
                        <input type="file" accept="image/*" onChange={handleFileChange} />
                        {photoPreview && (
                            <img
                                src={photoPreview}
                                alt="preview"
                                style={{ marginTop: 8, width: 120, height: 120, objectFit: 'cover', borderRadius: 8 }}
                            />
                        )}
                    </div>
                )}

                <button type="submit" style={btnPrimary}>
                    {isEdit ? 'Зберегти зміни' : 'Додати'}
                </button>
            </form>

            {/* ── Форма оновлення фото (тільки при редагуванні) ── */}
            {isEdit && onPhotoSubmit && (
                <form onSubmit={handlePhotoSubmit} style={{
                    marginTop: 32, paddingTop: 24,
                    borderTop: '1px solid #eee',
                }}>
                    <h3 style={{ margin: '0 0 12px', fontSize: 16 }}>Оновити фото</h3>
                    <input type="file" accept="image/*" onChange={handleFileChange} />
                    {photoPreview && (
                        <img
                            src={photoPreview}
                            alt="preview"
                            style={{ marginTop: 8, width: 120, height: 120, objectFit: 'cover', borderRadius: 8, display: 'block' }}
                        />
                    )}
                    <button type="submit" style={{ ...btnPrimary, marginTop: 12 }}>
                        Завантажити нове фото
                    </button>
                </form>
            )}
        </div>
    );
}

// Стилі
const labelStyle = { display: 'block', marginBottom: 6, fontWeight: 600, fontSize: 14 };
const inputStyle = {
    width: '100%', padding: '9px 12px', borderRadius: 8,
    border: '1px solid #ddd', fontSize: 14, boxSizing: 'border-box',
    outline: 'none',
};
const btnPrimary = {
    padding: '10px 24px', background: '#1976d2', color: '#fff',
    border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: 14,
};