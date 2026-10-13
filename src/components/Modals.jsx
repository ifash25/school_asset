import { useState } from 'react';
import { useApp } from '../lib/AppContext';
import { UNITS } from '../lib/store';
import { can } from '../lib/auth';

export function AssetModal({ open, onClose }) {
  const { me, toast, addAsset } = useApp();
  const [form, setForm] = useState({ nama: '', unit: me?.unit !== 'all' ? me?.unit || 'smk' : 'smk', room: '', val: '' });
  if (!open) return null;
  const save = async (e) => {
    e.preventDefault();
    if (!can(me, 'aset.create')) { toast('Akses ditolak: hanya Admin Unit & Super Admin'); return; }
    const n = (form.nama || '').trim();
    if (!n) return;
    const u = form.unit;
    const c = u.toUpperCase().slice(0, 3) + '-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000);
    const row = { code: c, name: n, unit: u, room: form.room || 'Gudang', cat: 'Elektronik & TIK', value: Number(form.val || 0), cond: 'baik', fund: 'Yayasan', icon: 'inventory_2' };
    await addAsset(row, { t: 'Registrasi Aset Baru', time: 'Baru saja', d: `${n} (${c})`, m: me?.name || 'Admin' });
    onClose();
    setForm({ nama: '', unit: u, room: '', val: '' });
    toast(`Aset ${c} tersimpan`);
  };
  return (
    <div className="fixed inset-0 z-[90] grid place-items-center p-4" style={{ background: 'rgba(17,28,45,.45)', backdropFilter: 'blur(2px)' }} onClick={onClose}>
      <form onSubmit={save} onClick={(e) => e.stopPropagation()} className="bg-white rounded-2xl p-6 w-[min(560px,94vw)]">
        <h3 className="font-jakarta font-bold text-[18px]">Tambah Aset Baru</h3>
        <div className="grid sm:grid-cols-2 gap-2 mt-3">
          <input required value={form.nama} onChange={(e) => setForm({ ...form, nama: e.target.value })} className="bg-low rounded-lg px-3 py-2 text-[13px]" placeholder="Nama aset *" />
          <select value={form.unit} onChange={(e) => setForm({ ...form, unit: e.target.value })} className="bg-low rounded-lg px-3 py-2 text-[13px]">
            {UNITS.map((u) => <option key={u.id} value={u.id}>{u.name}</option>)}
          </select>
          <input value={form.room} onChange={(e) => setForm({ ...form, room: e.target.value })} className="bg-low rounded-lg px-3 py-2 text-[13px]" placeholder="Ruangan" />
          <input value={form.val} onChange={(e) => setForm({ ...form, val: e.target.value })} type="number" className="bg-low rounded-lg px-3 py-2 text-[13px]" placeholder="Nilai (Rp)" />
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <button type="button" onClick={onClose} className="px-4 py-2 bg-low rounded-lg text-[13px] font-semibold">Batal</button>
          <button className="px-4 py-2 bg-primary text-white rounded-lg text-[13px] font-semibold">Simpan</button>
        </div>
      </form>
    </div>
  );
}

export function ScanModal({ open, onClose }) {
  const { store, toast, addActivity } = useApp();
  const [code, setCode] = useState(store.assets[0]?.code || '');
  if (!open) return null;
  const verify = async () => {
    await addActivity({ t: 'Audit Ruangan Selesai', time: 'Baru saja', d: `Scan ${code} cocok.`, m: 'Tim Internal' });
    onClose();
    toast(`Scan ${code} cocok`);
  };
  return (
    <div className="fixed inset-0 z-[90] grid place-items-center p-4" style={{ background: 'rgba(17,28,45,.45)' }} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-2xl p-6 text-center w-[min(440px,94vw)]">
        <h3 className="font-jakarta font-bold text-[18px]">Scan QR Cepat</h3>
        <select value={code} onChange={(e) => setCode(e.target.value)} className="w-full bg-low rounded-lg px-3 py-2 text-[13px] mt-3">
          {store.assets.map((a) => <option key={a.code} value={a.code}>{a.code} — {a.name}</option>)}
        </select>
        <div className="flex gap-2 mt-4">
          <button onClick={onClose} className="flex-1 bg-low rounded-lg py-2 text-[13px] font-semibold">Tutup</button>
          <button onClick={verify} className="flex-1 bg-primary text-white rounded-lg py-2 text-[13px] font-semibold">Verifikasi</button>
        </div>
      </div>
    </div>
  );
}
