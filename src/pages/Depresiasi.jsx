import { useApp } from '../lib/AppContext';
import { can } from '../lib/auth';
import { rp } from '../lib/store';
import { Banner } from '../components/ui';

export function Depresiasi() {
  const { store, me, toast } = useApp();
  const ba = (code) => {
    if (!can(me, 'disposal.approve')) { toast('Diajukan ke Auditor — menunggu persetujuan'); return; }
    toast(`BA ${code} diterbitkan`);
  };
  return (
    <>
      <Banner />
      <div className="grid md:grid-cols-2 gap-4">
        <div className="card p-6">
          <h2 className="font-jakarta font-bold text-[18px]">Depresiasi Garis Lurus</h2>
          {store.assets.slice(0, 5).map((a) => {
            const nb = Math.round(a.value * 0.75);
            return (
              <div key={a.code} className="bg-low rounded-xl p-3 mb-2 text-[13px]">
                <div className="flex justify-between"><b>{a.name}</b><span className="text-mut text-[11px]">{a.code}</span></div>
                <div className="text-mut text-[12px]">Buku: <b className="text-primary">{rp(nb)}</b></div>
              </div>
            );
          })}
        </div>
        <div className="card p-6">
          <h3 className="font-jakarta font-bold mb-2">Usulan Pemutihan</h3>
          {store.assets.filter((a) => a.cond !== 'baik').map((a) => (
            <div key={a.code} className="bg-low rounded-xl p-3 mb-2 text-[13px] flex justify-between items-center">
              <b>{a.name}</b>
              <button onClick={() => ba(a.code)} className="px-3 py-1.5 bg-primary text-white rounded-lg text-[12px] font-semibold">Buat BA</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
