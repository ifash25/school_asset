import { useApp } from '../lib/AppContext';
import { rp, unitOf } from '../lib/store';

export const ROWS = [
  ['pusat', '342 Aset', 4200000000, 28.3, '#003820'],
  ['smk', '840 Aset', 3800000000, 25.6, '#0f5132'],
  ['smp', '715 Aset', 2900000000, 19.5, '#005049'],
  ['sd', '890 Aset', 2400000000, 16.2, '#2d6a48'],
  ['tk', '410 Aset', 950000000, 6.4, '#904d00'],
  ['rq', '231 Aset', 600000000, 4.0, '#fe932c'],
];

export function Distribusi({ mode, setMode }) {
  const { store } = useApp();
  const list = store.unit === 'all' ? ROWS : ROWS.filter((r) => r[0] === store.unit);
  return (
    <div className="card p-6">
      <div className="flex flex-col sm:flex-row justify-between gap-2">
        <div><h2 className="font-jakarta font-bold text-[18px]">Distribusi Valuasi &amp; Jumlah Aset</h2><p className="text-[12px] text-mut">Pemetaan porsi anggaran kapital Yayasan per unit</p></div>
        <div className="inline-flex bg-low rounded-lg p-0.5 text-[12px]">
          <button onClick={() => setMode('nilai')} className={`px-3 py-1 rounded-md ${mode === 'nilai' ? 'bg-white font-semibold shadow' : ''}`}>Nilai (Rp)</button>
          <button onClick={() => setMode('qty')} className={`px-3 py-1 rounded-md ${mode === 'qty' ? 'bg-white font-semibold shadow' : ''}`}>Kuantitas</button>
        </div>
      </div>
      <div className="mt-3 flex flex-col gap-3">
        {list.map((r) => {
          const u = unitOf(r[0]);
          return (
            <div key={r[0]}>
              <div className="flex justify-between text-[13px] gap-2"><span><b>{u.short}</b> • <b>{u.name}</b></span><span className="shrink-0"><span className="text-mut">{r[1]}</span> <b>{mode === 'nilai' ? rp(r[2]) : r[1]}</b></span></div>
              <div className="w-full bg-cont h-2.5 rounded-full mt-1"><div className="h-full rounded-full" style={{ width: `${r[3]}%`, background: r[4] }}></div></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function FundCat() {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="card p-5">
        <h3 className="font-jakarta font-bold">Sumber Perolehan Dana</h3>
        <p className="text-[12px] text-mut mb-2">Legalitas kepemilikan &amp; akad modal</p>
        <div className="text-[13px]">Kas Yayasan 42%<div className="bg-cont h-2 rounded-full mb-2"><div className="bg-primary h-full rounded-full" style={{ width: '42%' }}></div></div>Dana BOS 34%<div className="bg-cont h-2 rounded-full mb-2"><div className="h-full rounded-full" style={{ width: '34%', background: '#005049' }}></div></div>Wakaf 18%<div className="bg-cont h-2 rounded-full mb-2"><div className="h-full rounded-full" style={{ width: '18%', background: '#fe932c' }}></div></div>Donatur 6%<div className="bg-cont h-2 rounded-full"><div className="h-full rounded-full bg-out" style={{ width: '6%' }}></div></div></div>
      </div>
      <div className="card p-5">
        <h3 className="font-jakarta font-bold">Komposisi Klasifikasi Aset</h3>
        <div className="flex h-3 rounded-full overflow-hidden bg-cont my-3"><div className="bg-primary" style={{ width: '38%' }}></div><div style={{ width: '28%', background: '#005049' }}></div><div style={{ width: '20%', background: '#fe932c' }}></div><div className="bg-out" style={{ width: '14%' }}></div></div>
        <div className="grid grid-cols-2 gap-2 text-[13px]">
          <div className="bg-low rounded-lg p-2"><b>TIK 38%</b><div className="text-mut text-[12px]">1.302 unit</div></div>
          <div className="bg-low rounded-lg p-2"><b>Mebel 28%</b><div className="text-mut text-[12px]">960 set</div></div>
          <div className="bg-low rounded-lg p-2"><b>Gedung 20%</b><div className="text-mut text-[12px]">24 sertifikat</div></div>
          <div className="bg-low rounded-lg p-2"><b>Lab 14%</b><div className="text-mut text-[12px]">480 alat</div></div>
        </div>
      </div>
    </div>
  );
}
