import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout.jsx';
import { RequireAuth } from './components/Guard.jsx';
import { Login } from './pages/Login.jsx';
import { Dashboard } from './pages/Dashboard.jsx';
import { Katalog } from './pages/Katalog.jsx';
import { Layanan } from './pages/Layanan.jsx';
import { Audit } from './pages/Audit.jsx';
import { Depresiasi } from './pages/Depresiasi.jsx';
import { Pengaturan } from './pages/Pengaturan.jsx';
import { Bantuan } from './pages/Bantuan.jsx';

export default function App() {
  const [query, setQuery] = useState('');
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Layout query={query} setQuery={setQuery}><RequireAuth menu="dashboard"><Dashboard /></RequireAuth></Layout>} />
      <Route path="/katalog" element={<Layout query={query} setQuery={setQuery}><RequireAuth menu="katalog"><Katalog query={query} /></RequireAuth></Layout>} />
      <Route path="/layanan" element={<Layout query={query} setQuery={setQuery}><RequireAuth menu="layanan"><Layanan /></RequireAuth></Layout>} />
      <Route path="/audit" element={<Layout query={query} setQuery={setQuery}><RequireAuth menu="audit"><Audit /></RequireAuth></Layout>} />
      <Route path="/depresiasi" element={<Layout query={query} setQuery={setQuery}><RequireAuth menu="depresiasi"><Depresiasi /></RequireAuth></Layout>} />
      <Route path="/pengaturan" element={<Layout query={query} setQuery={setQuery}><RequireAuth menu="pengaturan"><Pengaturan /></RequireAuth></Layout>} />
      <Route path="/bantuan" element={<Layout query={query} setQuery={setQuery}><RequireAuth menu="bantuan"><Bantuan /></RequireAuth></Layout>} />
    </Routes>
  );
}
