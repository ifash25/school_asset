import { useState } from 'react';
import { useApp } from '../lib/AppContext';
import { filteredAssets, rp } from '../lib/store';
import { Banner } from '../components/ui';
import { AssetModal } from '../components/Modals';

export function Katalog({ query }) {
  const { store, toast, updateAsset, removeAsset } = useApp();
  const [show, setShow] = useState(false);
  const [editing, setEditing] = useState(null);
  const q = (query || '').toLowerCase();
  const a = filteredAssets(store).filter((x) => (x.name + x.code).toLowerCase().includes(q));
  const cycleCond = async (x) => {
    const order = ['baik', 'ringan', 'berat', 'servis', 'dipinjam'];
    const next = order[(order.indexOf(x.cond) + 1) % order.length];
    await updateAsset(x.code, { cond: next });
    toast(`${x.code} -> ${next}`);
  };
  const hapus = async (x) => {
    if (!window.confirm(`Hapus ${x.name} (${x.code})?`)) return;
    await removeAsset(x.code);
    toast(`${x.code} dihapus`);
  };
  return (
    <>
      <Banner />
      <div className="card p-6">
        <div className="flex justify-between flex-wrap gap-2 mb-3">
          <div><h2 className="font-jakarta font-bold text-[18px]">Katalog &amp; Registrasi Aset</h2><p className="text-[12px] text-mut">{a.length} data</p></div>
          <button onClick={() => setShow(true)} className="px-4 py-2 bg-primary text-white rounded-lg text-[12px] font-semibold">+ Registrasi</button>
        </div>
        <div className="table-wrap">
          <table className="w-full text-[13px]">
            <tbody>
              {a.map((x) => (
                <tr key={x.code} className="border-t border-cont">
                  <td className="py-2.5 px-3"><b>{x.name}</b><div className="text-[11px] text-mut">{x.code} • {x.fund} • {x.cond}</div></td>
                  <td className="py-2.5 px-3"><b>{rp(x.value)}</b></td>
                  <td className="py-2.5 px-3 text-right whitespace-nowrap">
                    <button onClick={() => toast(`QR ${x.code} ke printer`)} className="px-3 py-1 bg-cont text-primary rounded-lg text-[12px] font-semibold mr-1">QR</button>
                    <button onClick={() => setEditing(x)} className="px-3 py-1 bg-low text-primary rounded-lg text-[12px] font-semibold mr-1">Ubah</button>
                    <button onClick={() => cycleCond(x)} className="px-3 py-1 bg-low text-primary rounded-lg text-[12px] font-semibold mr-1">Kondisi</button>
                    <button onClick={() => hapus(x)} className="px-3 py-1 bg-econt text-err rounded-lg text-[12px] font-semibold">Hapus</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <AssetModal open={show} onClose={() => setShow(false)} />
      {editing && <EditAsset x={editing} onClose={() => setEditing(null)} />}
    </>
  );
}

function EditAsset({ x, onClose }) {
  const { toast, updateAsset } = useApp();
  const [f, setF] = useState({ name: x.name, room: x.room, value: x.value, fund: x.fund });
  const save = async (e) => {
    e.preventDefault();
    await updateAsset(x.code, { name: f.name, room: f.room, value: Number(f.value || 0), fund: f.fund });
    onClose();
    toast(`${x.code} diperbarui`);
  };
  return (
    <div className="fixed inset-0 z-[90] grid place-items-center p-4" style={{ background: 'rgba(17,28,45,.45)' }} onClick={onClose}>
      <form onSubmit={save} onClick={(e) => e.stopPropagation()} className="bg-white rounded-2xl p-6 w-[min(480px,94vw)]">
        <h3 className="font-jakarta font-bold text-[18px]">Ubah {x.code}</h3>
        <input value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} className="w-full bg-low rounded-lg px-3 py-2 text-[13px] mt-3" />
        <div className="grid grid-cols-2 gap-2 mt-2">
          <input value={f.room} onChange={(e) => setF({ ...f, room: e.target.value })} className="bg-low rounded-lg px-3 py-2 text-[13px]" placeholder="Ruangan" />
          <input value={f.value} onChange={(e) => setF({ ...f, value: e.target.value })} type="number" className="bg-low rounded-lg px-3 py-2 text-[13px]" placeholder="Nilai" />
        </div>
        <input value={f.fund} onChange={(e) => setF({ ...f, fund: e.target.value })} className="w-full bg-low rounded-lg px-3 py-2 text-[13px] mt-2" placeholder="Sumber dana" />
        <div className="flex justify-end gap-2 mt-4">
          <button type="button" onClick={onClose} className="px-4 py-2 bg-low rounded-lg text-[13px] font-semibold">Batal</button>
          <button className="px-4 py-2 bg-primary text-white rounded-lg text-[13px] font-semibold">Simpan</button>
        </div>
      </form>
    </div>
  );
}
