import { useState } from 'react';
import { useApp } from '../lib/AppContext';
import { filteredAssets, rp } from '../lib/store';
import { Banner } from '../components/ui';
import { AssetModal } from '../components/Modals';

export function Katalog({ query }) {
  const { store, toast } = useApp();
  const [show, setShow] = useState(false);
  const q = (query || '').toLowerCase();
  const a = filteredAssets(store).filter((x) => (x.name + x.code).toLowerCase().includes(q));
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
                  <td className="py-2.5 px-3"><b>{x.name}</b><div className="text-[11px] text-mut">{x.code} • {x.fund}</div></td>
                  <td className="py-2.5 px-3"><b>{rp(x.value)}</b></td>
                  <td className="py-2.5 px-3 text-right"><button onClick={() => toast(`QR ${x.code} ke printer`)} className="px-3 py-1 bg-cont text-primary rounded-lg text-[12px] font-semibold">Cetak QR</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <AssetModal open={show} onClose={() => setShow(false)} />
    </>
  );
}
