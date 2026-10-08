import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useApp } from '../lib/AppContext';
import { Icon } from '../components/Icon';
import { DEMO } from './loginDemo';

export function Login() {
  const { me, login } = useApp();
  const nav = useNavigate();
  const [u, setU] = useState('');
  const [p, setP] = useState('');
  const [err, setErr] = useState('');
  if (me) return <Navigate to="/" replace />;
  const go = (a, b) => {
    if (!login(a, b)) setErr('Username atau kata sandi salah.');
    else nav('/');
  };
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="hidden lg:flex flex-col justify-between bg-primary text-white p-10">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white/15 grid place-items-center"><Icon name="mosque" /></div>
            <div><div className="font-jakarta font-bold text-[20px]">SIMAS Yayasan</div><div className="text-[12px] opacity-80">Sistem Informasi Manajemen Aset</div></div>
          </div>
          <p className="mt-8 text-[15px] opacity-90 max-w-md">Inventarisasi terpusat 6 unit pendidikan &amp; dakwah dengan hak akses berbasis peran.</p>
        </div>
        <div className="flex items-center gap-2 text-[12px] opacity-80"><Icon name="verified" />Amanah Waqf Certified</div>
      </div>
      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-md card p-6 sm:p-8">
          <h1 className="font-jakarta font-bold text-[22px]">Assalamu&apos;alaikum</h1>
          <p className="text-[13px] text-mut mt-1 mb-5">Masuk sesuai peran &amp; unit kerja Anda.</p>
          {err && <div className="mb-3 px-3 py-2 rounded-lg bg-econt text-err text-[13px] font-medium">{err}</div>}
          <form onSubmit={(e) => { e.preventDefault(); go(u, p); }}>
            <input value={u} onChange={(e) => setU(e.target.value)} className="w-full bg-low rounded-lg px-3 py-2.5 text-[14px] mb-3" placeholder="Username mis. superadmin" required />
            <input value={p} onChange={(e) => setP(e.target.value)} type="password" className="w-full bg-low rounded-lg px-3 py-2.5 text-[14px] mb-4" placeholder="Kata sandi" required />
            <button className="w-full bg-primary text-white rounded-lg py-2.5 text-[14px] font-semibold">Masuk ke Dashboard</button>
          </form>
          <div className="grid gap-2 mt-5">
            {DEMO.map((a) => (
              <button key={a[0]} onClick={() => go(a[0], a[1])} className="flex items-center gap-3 p-2.5 rounded-xl bg-low hover:bg-cont text-left">
                <span className={`w-9 h-9 rounded-lg ${a[4]} text-white grid place-items-center`}><Icon name={a[3]} /></span>
                <span><span className="block text-[13px] font-semibold">{a[2]}</span><span className="block text-[11px] text-mut">{a[0]} • {a[1]}</span></span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
