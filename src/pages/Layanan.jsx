import { useState } from 'react';
import { useApp } from '../lib/AppContext';
import { Banner } from '../components/ui';

export function Layanan() {
  const { store, setStore, toast } = useApp();
  const [item, setItem] = useState('');
  const add = () => {
    if (!item.trim()) { toast('Isi nama barang'); return; }
    setStore((s) => ({ ...s, loans: [{ item, by: 'Staf', status: 'Diajukan', due: '3 hari' }, ...s.loans] }));
    setItem('');
    toast('Pengajuan dikirim');
  };
  return (
    <>
      <Banner />
      <div className="grid md:grid-cols-2 gap-4">
        <div className="card p-6">
          <h2 className="font-jakarta font-bold text-[18px]">Pengajuan Peminjaman</h2>
          <input value={item} onChange={(e) => setItem(e.target.value)} className="w-full bg-low rounded-lg px-3 py-2 text-[13px] mt-3 mb-2" placeholder="Nama barang" />
          <button onClick={add} className="px-4 py-2 bg-primary text-white rounded-lg text-[13px] font-semibold">Ajukan</button>
        </div>
        <div className="card p-6">
          <h3 className="font-jakarta font-bold mb-2">Siklus Aktif</h3>
          {store.loans.map((l, i) => (
            <div key={i} className="bg-low rounded-xl p-3 mb-2 text-[13px]"><b>{l.item}</b><div className="text-mut text-[12px]">{l.by} • {l.due}</div></div>
          ))}
        </div>
      </div>
    </>
  );
}
