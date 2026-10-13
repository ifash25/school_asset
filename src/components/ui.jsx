import { useApp } from '../lib/AppContext';
import { isSupabaseConfigured } from '../lib/supabase';
import { Icon } from './Icon';

export function DbBadge() {
  const { dbReady } = useApp();
  if (!isSupabaseConfigured) {
    return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-low text-mut text-[11px] font-semibold"><span className="w-1.5 h-1.5 rounded-full bg-out"></span>Local Mode</span>;
  }
  return dbReady
    ? <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-low text-primary text-[11px] font-semibold"><span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>Supabase Live</span>
    : <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-low text-second text-[11px] font-semibold"><span className="w-1.5 h-1.5 rounded-full bg-scont animate-pulse"></span>Menghubungkan…</span>;
}

export function Banner({ onExportPdf, onExportXlsx }) {
  const { toast, me, missingTables } = useApp();
  const name = me?.name || 'Bapak/Ibu';
  const doExport = (k) => {
    if (k === 'pdf' && onExportPdf) return onExportPdf();
    if (k === 'xlsx' && onExportXlsx) return onExportXlsx();
    toast(k === 'pdf' ? 'Menyusun PDF eksekutif...' : 'Mengekspor Buku Induk .XLSX...');
  };
  return (
    <>
    <div className="card p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <div className="flex items-center gap-2 text-[12px]">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-low text-primary font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
            Konsolidasi Terpusat
          </span>
          <DbBadge />
          <span className="text-mut">Update Otomatis: Hari ini, 08:45 WIB</span>
        </div>
        <h1 className="font-jakarta text-[20px] font-bold mt-2">Assalamu&rsquo;alaikum, {name}</h1>
        <p className="text-[13px] text-mut max-w-2xl mt-1">
          Ringkasan inventarisasi, valuasi aset, status kepatuhan audit, dan logistik terpadu untuk 6 unit pendidikan &amp; dakwah.
        </p>
      </div>
      <div className="flex items-center flex-wrap gap-2">
        <div className="bg-low px-3 py-1.5 rounded-lg text-[12px]">TA 2024/2025 Genap</div>
        <ExportMenu onExport={doExport} />
      </div>
    </div>
    {missingTables && missingTables.length > 0 && (
      <div className="card p-4 border-l-4 border-err bg-[#fff5f4]">
        <div className="text-[13px] font-bold text-err">Tabel Supabase belum dibuat: {missingTables.join(', ')}</div>
        <div className="text-[12px] text-mut mt-1">
          1) Buka Supabase Dashboard project <b>nspxynbsjoeyujhlvtjp</b> &gt; SQL Editor &gt; New Query.
          2) Copy-paste isi file <b>supabase-schema.sql</b> di root project lalu Run.
          3) Refresh halaman ini — badge akan berubah menjadi Supabase Live.
        </div>
      </div>
    )}
    </>
  );
}

function ExportMenu({ onExport }) {
  const { toast } = useApp();
  const open = (v) => {
    const el = document.getElementById('exportMenu');
    if (el) el.classList.toggle('hidden');
  };
  return (
    <div className="relative">
      <button id="btnExport" onClick={open} className="bg-primary text-white px-4 py-1.5 rounded-lg text-[12px] font-semibold">
        Unduh Laporan Konsolidasi
      </button>
      <div
        id="exportMenu"
        onClick={(e) => e.stopPropagation()}
        className="hidden absolute right-0 mt-1 w-56 bg-white shadow-xl rounded-xl p-1 z-30"
      >
        <button onClick={() => { document.getElementById('exportMenu')?.classList.add('hidden'); onExport('pdf'); }} className="w-full text-left px-3 py-2 hover:bg-low rounded-lg text-[13px]">
          Laporan Eksekutif (.PDF)
        </button>
        <button onClick={() => { document.getElementById('exportMenu')?.classList.add('hidden'); onExport('xlsx'); }} className="w-full text-left px-3 py-2 hover:bg-low rounded-lg text-[13px]">
          Buku Induk Aset (.XLSX)
        </button>
        <button onClick={() => { document.getElementById('exportMenu')?.classList.add('hidden'); window.print(); }} className="w-full text-left px-3 py-2 hover:bg-low rounded-lg text-[13px]">
          Lembar Audit Cetak
        </button>
      </div>
    </div>
  );
}

export function Toast() {
  const { toastMsg } = useApp();
  if (!toastMsg) return null;
  return (
    <div className="toast fixed bottom-5 right-5 bg-[#111c2d] text-white text-[13px] px-4 py-2.5 rounded-xl shadow-xl z-[99]">
      {toastMsg}
    </div>
  );
}

export function Empty({ icon = 'inventory_2', title = 'Belum ada data' }) {
  return (
    <div className="text-center py-8 text-mut text-[13px]">
      <Icon name={icon} className="text-[32px] block mx-auto mb-2" />
      {title}
    </div>
  );
}
