import { useState } from 'react';
import { useApp } from '../lib/AppContext';
import { kpi, rp } from '../lib/store';
import { Banner } from '../components/ui';

export function DashTop() {
  const { store } = useApp();
  const k = kpi(store);
  return (
    <>
      <Banner />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card p-5"><div className="text-[11px] text-mut uppercase font-semibold">Total Valuasi Aset</div><div className="font-jakarta text-[22px] font-bold">{rp(k.valuasi)}</div><div className="mt-3 bg-low rounded-lg px-3 py-1.5 text-[12px]">+8.4% YoY • per Jan 2025</div></div>
        <div className="card p-5"><div className="text-[11px] text-mut uppercase font-semibold">Total Barang Terdata</div><div className="font-jakarta text-[22px] font-bold">{k.count.toLocaleString('id-ID')} Barang</div><div className="mt-3 bg-low rounded-lg px-3 py-1.5 text-[12px]">98.2% Berlabel QR</div></div>
        <div className="card p-5"><div className="text-[11px] text-mut uppercase font-semibold">Kondisi Prima</div><div className="font-jakarta text-[22px] font-bold">3.120 Unit</div><div className="mt-3 bg-low rounded-lg px-3 py-1.5 text-[12px]">215 ringan • 68 berat • 25 servis</div></div>
        <div className="card p-5"><div className="text-[11px] text-mut uppercase font-semibold">Peminjaman &amp; Servis</div><div className="font-jakarta text-[22px] font-bold">18 Pinjaman</div><div className="mt-3 bg-low rounded-lg px-3 py-1.5 text-[12px]">3 tempo hari ini • 7 tiket</div></div>
      </div>
    </>
  );
}

export function useDistMode() {
  return useState('nilai');
}
