import { ROLES, allUsers, can } from '../lib/auth';
import { unitOf } from '../lib/store';

export function UsersTable({ store, me, toast }) {
  const manage = can(me, 'user.manage');
  const users = allUsers(store.extraUsers);
  return (
    <div className="table-wrap">
      <table className="w-full text-[13px]">
        <thead><tr className="bg-low text-mut text-[11px] uppercase"><th className="py-2 px-3 rounded-l-lg text-left">Pengguna</th><th className="py-2 px-3 text-left">Peran</th><th className="py-2 px-3 text-left">Unit</th><th className="py-2 px-3 text-right rounded-r-lg">Aksi</th></tr></thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.username} className="border-t border-cont">
              <td className="py-2.5 px-3"><b>{u.name}</b><div className="text-[11px] text-mut font-mono">{u.username}</div></td>
              <td className="py-2.5 px-3"><span className="px-2 py-0.5 rounded-full bg-cont text-primary text-[11px] font-bold">{ROLES[u.role].short}</span></td>
              <td className="py-2.5 px-3 text-[12px]">{u.role === 'super_admin' ? 'Semua Unit' : unitOf(u.unit)?.name}</td>
              <td className="py-2.5 px-3 text-right">{manage && u.username !== me.username ? <button onClick={() => toast(`Sandi ${u.username} direset ke 123456`)} className="px-3 py-1 bg-cont text-primary rounded-lg text-[12px] font-semibold">Reset Sandi</button> : <span className="text-[11px] text-mut">—</span>}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
