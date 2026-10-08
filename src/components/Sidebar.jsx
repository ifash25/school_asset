import { NavLink } from 'react-router-dom';
import { useApp } from '../lib/AppContext';
import { ROLES, canAccess } from '../lib/auth';
import { UNITS, unitOf } from '../lib/store';
import { Icon } from './Icon';

export const NAV1 = [
  ['dashboard', 'dashboard', 'Executive Dashboard', '/'],
  ['katalog', 'inventory_2', 'Katalog & Registrasi', '/katalog'],
  ['layanan', 'swap_horizontal_circle', 'Layanan & Peminjaman', '/layanan'],
  ['audit', 'qr_code_scanner', 'Audit & Stock Opname', '/audit'],
];
export const NAV2 = [
  ['depresiasi', 'trending_down', 'Depresiasi & Pemutihan', '/depresiasi'],
  ['pengaturan', 'admin_panel_settings', 'Pengaturan & RBAC', '/pengaturan'],
  ['bantuan', 'menu_book', 'Bantuan & Dokumen', '/bantuan'],
];

export function Sidebar({ mobileOpen, onNav }) {
  const { store, setStore, me } = useApp();
  if (!me) return null;
  const locked = me.role !== 'super_admin';
  const btn = ([key, icon, label, to]) => (
    <NavLink
      key={key}
      to={to}
      onClick={onNav}
      className={({ isActive }) =>
        `flex items-center gap-2 px-3 py-2 rounded-lg text-left ${isActive ? 'nav-active' : 'text-mut hover:bg-cont'}`
      }
    >
      <Icon name={icon} className="text-[20px]" />
      <span>{label}</span>
    </NavLink>
  );
  return (
    <aside className={`no-print fixed left-0 top-0 h-full w-72 bg-white z-50 flex-col shadow ${mobileOpen ? 'flex' : 'hidden md:flex'}`}>
      <div className="p-4 flex items-center gap-2">
        <div className="w-9 h-9 rounded-xl bg-primary text-white grid place-items-center"><Icon name="mosque" /></div>
        <div>
          <div className="font-jakarta font-bold text-primary leading-tight">SIMAS Yayasan</div>
          <div className="text-[11px] text-mut">Sistem Informasi Manajemen Aset</div>
        </div>
      </div>
      <div className="px-4 pb-2">
        <label className="text-[11px] font-semibold text-mut uppercase">Konteks Satuan Unit</label>
        <div className="relative mt-1">
          <select
            value={locked ? me.unit : store.unit}
            disabled={locked}
            onChange={(e) => setStore((s) => ({ ...s, unit: e.target.value }))}
            className="w-full appearance-none bg-low text-[13px] rounded-lg px-3 py-2 pr-8"
          >
            {!locked && <option value="all">Semua Unit (Konsolidasi)</option>}
            {UNITS.filter((u) => !locked || u.id === me.unit).map((u) => (
              <option key={u.id} value={u.id}>{u.name}</option>
            ))}
          </select>
          <Icon name="expand_more" className="absolute right-2 top-1/2 -translate-y-1/2 text-mut" />
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto px-3 py-1 text-[13px]">
        <div className="px-2 py-1 text-[11px] uppercase text-out font-semibold">Operasional Inti</div>
        <div className="flex flex-col gap-1 mb-3">{NAV1.filter((x) => canAccess(me, x[0])).map(btn)}</div>
        <div className="px-2 py-1 text-[11px] uppercase text-out font-semibold">Manajemen &amp; Tata Kelola</div>
        <div className="flex flex-col gap-1">{NAV2.filter((x) => canAccess(me, x[0])).map(btn)}</div>
      </nav>
      <div className="m-3 p-3 bg-low rounded-xl">
        <div className="flex items-center gap-1 text-primary text-[12px] font-semibold">
          <Icon name="verified" className="text-[18px]" />Amanah Waqf Certified
        </div>
        <p className="text-[12px] text-mut mt-1">Sistem Audit Inventaris Terpadu Yayasan Pendidikan Islam.</p>
      </div>
    </aside>
  );
}
