import { useState } from 'react';
import { useApp } from '../lib/AppContext';
import { Banner } from '../components/ui';

export function Layanan() {
  const { store, toast, addLoan, updateLoan, removeLoan } = useApp();
  const [item, setItem] = useState('');
  const add = async () => {
    if (!item.trim()) { toast('Isi nama barang'); return; }
    await addLoan({ item, by: 'Staf', status: 'Diajukan', due: '3 hari' });
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
          {store.loans.map((l, i) => {
            const id = l.id ?? i;
            return (
              <div key={id} className="bg-low rounded-xl p-3 mb-2 text-[13px] flex justify-between items-center gap-2">
                <div><b>{l.item}</b><div className="text-mut text-[12px]">{l.by} • {l.status} • {l.due}</div></div>
                <div className="flex gap-1 shrink-0">
                  <button onClick={async () => { await updateLoan(id, { status: 'Disetujui' }); toast('Disetujui'); }} className="px-2 py-1 bg-white text-primary rounded-lg text-[11px] font-semibold">Setuju</button>
                  <button onClick={async () => { await updateLoan(id, { status: 'Selesai' }); toast('Selesai'); }} className="px-2 py-1 bg-white text-primary rounded-lg text-[11px] font-semibold">Selesai</button>
                  <button onClick={async () => { await removeLoan(id); toast('Dihapus'); }} className="px-2 py-1 bg-econt text-err rounded-lg text-[11px] font-semibold">Hapus</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
