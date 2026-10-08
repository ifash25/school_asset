import { useNavigate } from 'react-router-dom';
import { useApp } from '../lib/AppContext';
import { unitOf } from '../lib/store';

export function Alerts() {
  const { store, toast } = useApp();
  return (
    <div className="card p-6">
      <div className="flex justify-between flex-wrap gap-2"><h3 className="font-jakarta font-bold">Peringatan Jatuh Tempo &amp; Garansi</h3><span className="px-3 py-1 rounded-full bg-econt text-err text-[12px] font-bold">4 Perlu Eksekusi</span></div>
      <div className="table-wrap mt-2">
        <table className="w-full text-[13px]">
          <thead><tr className="bg-low text-mut text-[11px] uppercase"><th className="py-2 px-3 rounded-l-lg text-left">Aset</th><th className="py-2 px-3 text-left">Unit</th><th className="py-2 px-3 text-left">Perihal</th><th className="py-2 px-3 text-right rounded-r-lg">Aksi</th></tr></thead>
          <tbody>
            {store.alerts.map((a) => {
              const x = store.assets.find((v) => v.code === a.code) || {};
              return (
                <tr key={a.code} className="border-t border-cont">
                  <td className="py-2.5 px-3"><b>{x.name || a.code}</b><div className="text-[11px] text-mut">{a.code} • {a.due}</div></td>
                  <td className="py-2.5 px-3">{unitOf(x.unit)?.short || '-'}</td>
                  <td className="py-2.5 px-3"><b>{a.issue}</b><div className="text-[11px] text-mut">{a.vendor}</div></td>
                  <td className="py-2.5 px-3 text-right"><button onClick={() => toast(`${a.action} diproses`)} className="px-3 py-1 bg-cont text-primary rounded-lg text-[12px] font-semibold">{a.action}</button></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function StatusAudit() {
  const { store } = useApp();
  const nav = useNavigate();
  return (
    <>
      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2"></div>
        <div className="flex flex-col gap-4">
          <div className="card p-6 text-center">
            <h3 className="font-jakarta font-bold text-left">Status Kelayakan Aset</h3>
            <div className="relative inline-block py-2">
              <svg className="w-44 h-44 -rotate-90" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="none" stroke="#e7eeff" strokeWidth="12" /><circle cx="50" cy="50" r="40" fill="none" stroke="#003820" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset="22.6" strokeLinecap="round" /></svg>
              <div className="absolute inset-0 grid place-items-center"><div><div className="text-[28px] font-bold font-jakarta">91.0%</div><div className="text-[11px] text-mut">Siap Guna</div></div></div>
            </div>
            <div className="text-left text-[13px]">
              <div className="flex justify-between p-1">Prima<b>3.120</b></div>
              <div className="flex justify-between p-1">Ringan<b>215</b></div>
              <div className="flex justify-between p-1">Berat<b>68</b></div>
              <div className="flex justify-between p-1">Servis<b>25</b></div>
            </div>
            <button onClick={() => nav('/depresiasi')} className="bg-low rounded-lg py-2 text-primary text-[12px] font-semibold w-full mt-2">Buka Pemutihan</button>
          </div>
          <div className="rounded-xl bg-primary text-white p-6"><h3 className="font-jakarta font-bold">Audit Fisik Genap 2024/2025</h3><p className="text-[13px] opacity-90 mb-2">12 auditor • T-14 hari • Dokumen 85%.</p><div className="bg-pcont rounded-xl p-3 text-[12px]">Target 100% (3.428 aset)</div></div>
        </div>
      </div>
      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-start-3 card p-6">
          <h3 className="font-jakarta font-bold mb-2">Log Operasional Terkini</h3>
          {store.activities.map((a, i) => (
            <div key={i} className="mb-3 text-[13px]">
              <div className="flex justify-between text-[12px]"><b className="text-primary">{a.t}</b><span className="text-mut">{a.time}</span></div>
              <div>{a.d}</div><div className="text-[11px] text-mut">{a.m}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
