import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { InventoryProvider } from './store/InventoryContext';

// Адмін сторінки
import AdminInventory from './pages/AdminInventory';
import AdminInventoryCreate from './pages/AdminInventoryCreate';
import AdminInventoryEdit from './pages/AdminInventoryEdit';
import AdminInventoryDetails from './pages/AdminInventoryDetails';

// Користувацькі сторінки (лаб. 8)
import Gallery from './pages/Gallery';
import Favorites from './pages/Favorites';

export default function App() {
  return (
    <InventoryProvider>
      <BrowserRouter>
        <Routes>
          {/* Редирект з кореня */}
          <Route path="/" element={<Navigate to="/admin" replace />} />

          {/* Адмін */}
          <Route path="/admin" element={<AdminInventory />} />
          <Route path="/admin/create" element={<AdminInventoryCreate />} />
          <Route path="/admin/:id" element={<AdminInventoryDetails />} />
          <Route path="/admin/:id/edit" element={<AdminInventoryEdit />} />

          {/* Галерея */}
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </BrowserRouter>
    </InventoryProvider>
  );
}