import { useNavigate } from 'react-router-dom';
import { useApp } from '../lib/AppContext';
import { ROLES } from '../lib/auth';
import { unitOf } from '../lib/store';
import { Icon } from './Icon';

export function Header({ query, setQuery, onMenu, onAdd, onScan }) {
  const { me, logout, toast } = useApp();
  const nav = useNavigate();
  if (!me) return null;
  const role = ROLES[me.role];
  const avatar = me.name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase();
  return (
    <header className="no-print fixed top-0 md:left-72 left-0 right-0 h-16 bg-white/90 backdrop-blur z-40 shadow-sm">
      <div className="h-16 px-4 flex items-center justify-between gap-3">
        <button onClick={onMenu} className="md:hidden p-2"><Icon name="menu" /></button>
        <div className="hidden lg:flex items-center gap-2 text-[12px] text-mut">
          <Icon name="school" className="text-[18px]" />Tahun Ajaran 2024/2025 - Semester Genap
        </div>
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Icon name="search" className="absolute left-2 top-1/2 -translate-y-1/2 text-out text-[18px]" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} className="w-full bg-low rounded-lg pl-9 pr-3 py-1.5 text-[13px]" placeholder="Cari aset, No. Seri, barcode, atau ruangan..." />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={onAdd} className="hidden sm:inline-flex items-center gap-1 bg-primary text-white px-3 py-1.5 rounded-lg text-[12px] font-semibold">
            <Icon name="add" className="text-[18px]" />+ Tambah Aset Baru
          </button>
          <button onClick={onScan} className="hidden sm:inline-flex items-center gap-1 bg-high px-3 py-1.5 rounded-lg text-[12px] font-semibold">
            <Icon name="qr_code" className="text-[18px]" />Scan QR Cepat
          </button>
          <button onClick={() => toast('3 notifikasi belum dibaca')} className="relative p-2 rounded-full hover:bg-low">
            <Icon name="notifications" />
            <span className="absolute top-1 right-1 w-4 h-4 grid place-items-center rounded-full bg-err text-white text-[10px] font-bold">3</span>
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-pcont text-white grid place-items-center font-bold text-[12px]">{avatar}</div>
            <div className="hidden xl:block">
              <div className="text-[13px] font-semibold leading-tight">{me.name}</div>
              <div className="text-[11px] text-primary font-medium">{role.label}{me.role === 'super_admin' ? '' : ` • ${unitOf(me.unit)?.name}`}</div>
            </div>
            <button title="Keluar" onClick={() => { logout(); nav('/login'); }} className="p-2 rounded-full hover:bg-low text-mut">
              <Icon name="logout" className="text-[20px]" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
