import { ROLES, LOCATIONS } from '../lib/auth';
import { UNITS, unitOf } from '../lib/store';
import { Icon } from '../components/Icon';

export function Matrix() {
  return (
    <div className="table-wrap">
      <table className="w-full text-[13px]">
        <thead><tr className="bg-low text-mut text-[11px] uppercase"><th className="py-2 px-3 rounded-l-lg text-left">Menu</th>{Object.keys(ROLES).map((k) => <th key={k} className="py-2 px-3 text-center">{ROLES[k].short}</th>)}</tr></thead>
        <tbody>
          {['dashboard', 'katalog', 'layanan', 'audit', 'depresiasi', 'pengaturan', 'bantuan'].map((m) => (
            <tr key={m} className="border-t border-cont">
              <td className="py-2 px-3 font-semibold capitalize">{m}</td>
              {Object.keys(ROLES).map((k) => (
                <td key={k} className="py-2 px-3 text-center">
                  {ROLES[k].menus.includes(m) ? <Icon name="check_circle" className="text-primary text-[18px]" /> : <Icon name="cancel" className="text-out text-[18px]" />}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Locations() {
  return (
    <>
      {Object.keys(LOCATIONS).map((id) => {
        const u = unitOf(id);
        const L = LOCATIONS[id];
        return (
          <details key={id} className="bg-low rounded-xl mb-2">
            <summary className="p-3 cursor-pointer text-[13px] font-semibold list-none flex items-center gap-2"><span className="px-2 py-0.5 rounded-full bg-white text-primary text-[10px] font-bold">{u.short}</span>{L.campus}</summary>
            <div className="px-4 pb-3 text-[13px]">
              {L.buildings.map((b) => (
                <div key={b.name} className="mt-1"><b>{b.name}</b>{b.floors.map((f) => <div key={f.name} className="ml-3 text-mut">{f.name}: <span className="text-[#111c2d]">{f.rooms.join(', ')}</span></div>)}</div>
              ))}
            </div>
          </details>
        );
      })}
    </>
  );
}

export function RoleOptions() {
  return (
    <>
      <option value="admin_unit">Admin Unit</option>
      <option value="kepsek_auditor">Kepsek / Auditor</option>
      <option value="pj_ruangan">PJ Ruangan</option>
    </>
  );
}

export function UnitOptions() {
  return (
    <>
      {UNITS.map((u) => <option key={u.id} value={u.id}>{u.short}</option>)}
    </>
  );
}
