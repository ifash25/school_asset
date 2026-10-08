import { useApp } from '../lib/AppContext';
import { Banner } from '../components/ui';

export function Bantuan() {
  const { toast } = useApp();
  return (
    <>
      <Banner />
      <div className="card p-6">
        <h2 className="font-jakarta font-bold text-[18px]">Bantuan &amp; Dokumen</h2>
        <div className="grid sm:grid-cols-3 gap-3 mt-3">
          <button onClick={() => toast('SOP dibuka')} className="bg-low rounded-xl p-4 text-left"><b>SOP Opname</b><div className="text-[12px] text-mut">12 langkah</div></button>
          <button onClick={() => toast('Template dibuka')} className="bg-low rounded-xl p-4 text-left"><b>Label QR</b><div className="text-[12px] text-mut">Thermal</div></button>
          <button onClick={() => toast('Regulasi dibuka')} className="bg-low rounded-xl p-4 text-left"><b>Wakaf BWI</b><div className="text-[12px] text-mut">Isolasi aset</div></button>
        </div>
      </div>
    </>
  );
}
