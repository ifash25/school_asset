import { useState } from 'react';
import { useApp } from '../lib/AppContext';
import { ROLES, can } from '../lib/auth';
import { STORE_KEY } from '../lib/store';
import { Banner } from '../components/ui';
import { UsersTable } from './setUsers';
import { Matrix, Locations, RoleOptions, UnitOptions } from './setMeta';

export function Pengaturan() {
  const { store, me, toast, addUser } = useApp();
  const [form, setForm] = useState({ name: '', user: '', role: 'admin_unit', unit: 'smk' });
  const manage = can(me, 'user.manage');
  const add = async () => {
    if (!form.name.trim() || !form.user.trim()) { toast('Lengkapi nama & username'); return; }
    await addUser({ username: form.user.trim(), pass: '123456', name: form.name.trim(), role: form.role, unit: form.unit });
    setForm({ name: '', user: '', role: 'admin_unit', unit: 'smk' });
    toast('Pengguna dibuat (sandi: 123456)');
  };
  return (
    <>
      <Banner />
      <div className="card p-6">
        <h2 className="font-jakarta font-bold text-[18px]">Pengaturan, RBAC &amp; Lokasi</h2>
        <p className="text-[12px] text-mut">Masuk sebagai <b>{me.name}</b> ({ROLES[me.role].label})</p>
        <h3 className="font-jakarta font-bold mt-4 mb-2">Pengguna &amp; Peran</h3>
        <UsersTable store={store} me={me} toast={toast} />
        {manage ? (
          <>
            <div className="grid sm:grid-cols-4 gap-2 mt-3">
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="bg-low rounded-lg px-3 py-2 text-[13px]" placeholder="Nama" />
              <input value={form.user} onChange={(e) => setForm({ ...form, user: e.target.value })} className="bg-low rounded-lg px-3 py-2 text-[13px]" placeholder="username" />
              <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="bg-low rounded-lg px-3 py-2 text-[13px]"><RoleOptions /></select>
              <select value={form.unit} onChange={(e) => setForm({ ...form, unit: e.target.value })} className="bg-low rounded-lg px-3 py-2 text-[13px]"><UnitOptions /></select>
            </div>
            <button onClick={add} className="mt-2 px-4 py-2 bg-primary text-white rounded-lg text-[13px] font-semibold">+ Tambah Pengguna</button>
          </>
        ) : <p className="mt-2 text-[12px] text-mut">Penambahan pengguna hanya untuk Super Admin.</p>}
        <h3 className="font-jakarta font-bold mt-5 mb-2">Matriks Akses Menu per Peran</h3>
        <Matrix />
        <h3 className="font-jakarta font-bold mt-5 mb-2">Hierarki Lokasi Fisik</h3>
        <Locations />
        <button onClick={() => { try { localStorage.removeItem(STORE_KEY); } catch {} location.reload(); }} className="mt-4 px-4 py-2 bg-econt text-err rounded-lg text-[13px] font-semibold">Reset Data Aset</button>
      </div>
    </>
  );
}
