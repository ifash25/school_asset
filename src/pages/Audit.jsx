import { useState } from 'react';
import { useApp } from '../lib/AppContext';
import { Banner } from '../components/ui';
import { ScanModal } from '../components/Modals';

export function Audit() {
  const { store, toast } = useApp();
  const [show, setShow] = useState(false);
  return (
    <>
      <Banner />
      <div className="card p-6">
        <h3 className="font-jakarta font-bold">Sesi Stock Opname Genap</h3>
        <button onClick={() => setShow(true)} className="mt-3 px-4 py-2 bg-primary text-white rounded-lg text-[13px] font-semibold">Mulai Scan</button>
        <div className="mt-3">
          {store.assets.slice(0, 6).map((a) => (
            <label key={a.code} className="flex gap-3 p-2 hover:bg-low text-[13px]">
              <input type="checkbox" onChange={() => toast(`${a.code} OK`)} />
              <b className="flex-1">{a.name}</b>
              <span className="text-mut">{a.code}</span>
            </label>
          ))}
        </div>
      </div>
      <ScanModal open={show} onClose={() => setShow(false)} />
    </>
  );
}
