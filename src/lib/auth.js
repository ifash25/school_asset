export const ROLES = {
  super_admin: { label: 'Super Admin Yayasan', short: 'Super Admin', desc: 'Akses penuh lintas unit & audit finansial aset', icon: 'shield', menus: ['dashboard', 'katalog', 'layanan', 'audit', 'depresiasi', 'pengaturan', 'bantuan'], caps: ['unit.all', 'aset.create', 'loan.approve', 'disposal.approve', 'audit.review', 'user.manage', 'export'] },
  admin_unit: { label: 'Admin Unit / Sekolah', short: 'Admin Unit', desc: 'Pengelolaan aset pada unitnya sendiri', icon: 'school', menus: ['dashboard', 'katalog', 'layanan', 'audit', 'bantuan'], caps: ['aset.create', 'loan.approve', 'audit.review', 'export'] },
  kepsek_auditor: { label: 'Kepala Sekolah / Auditor', short: 'Kepsek / Auditor', desc: 'Persetujuan peminjaman, disposal & review opname', icon: 'fact_check', menus: ['dashboard', 'katalog', 'layanan', 'audit', 'depresiasi', 'bantuan'], caps: ['loan.approve', 'disposal.approve', 'audit.review', 'export'] },
  pj_ruangan: { label: 'PJ Ruangan / Guru / Staf', short: 'PJ Ruangan', desc: 'Pencatatan mutasi ringan & pelaporan kerusakan', icon: 'badge', menus: ['dashboard', 'katalog', 'layanan', 'audit', 'bantuan'], caps: ['loan.request', 'damage.report', 'audit.scan'] },
};

export const DEFAULT_USERS = [
  { username: 'superadmin', pass: 'yayasan123', name: 'Ust. H. Achmad Fauzi, M.Pd.', role: 'super_admin', unit: 'all' },
  { username: 'admin.smk', pass: 'smk123', name: 'Ahmad Syakir, S.Kom', role: 'admin_unit', unit: 'smk' },
  { username: 'admin.sd', pass: 'sd123', name: 'Lina Marlina, S.Pd.', role: 'admin_unit', unit: 'sd' },
  { username: 'kepsek.smp', pass: 'smp123', name: 'Drs. H. Budi Santoso', role: 'kepsek_auditor', unit: 'smp' },
  { username: 'pj.lab', pass: 'pj123', name: 'Dedi Supriadi', role: 'pj_ruangan', unit: 'smk', rooms: ['Lab Komputer 1', 'Lab Multimedia 2'] },
];

export const SES_KEY = 'simas_session_v1';

export function allUsers(extraUsers = []) {
  return DEFAULT_USERS.concat(extraUsers || []);
}
export function getSession() {
  try {
    const s = JSON.parse(localStorage.getItem(SES_KEY));
    if (!s || !s.username) return null;
    return s;
  } catch { return null; }
}
export function currentUser(extraUsers = []) {
  const s = getSession();
  if (!s) return null;
  return allUsers(extraUsers).find((u) => u.username === s.username) || null;
}
export function doLogin(u, p, extraUsers = []) {
  const w = allUsers(extraUsers).find((x) => x.username === (u || '').trim() && x.pass === p);
  if (!w) return null;
  localStorage.setItem(SES_KEY, JSON.stringify({ username: w.username, at: Date.now() }));
  return w;
}
export function doLogout() {
  try { localStorage.removeItem(SES_KEY); } catch {}
}
export function canAccess(user, m) {
  if (!user) return false;
  return ROLES[user.role].menus.includes(m);
}
export function can(user, c) {
  if (!user) return false;
  return ROLES[user.role].caps.includes(c);
}

export const LOCATIONS = {
  pusat: { campus: 'Kampus Pusat Yayasan', buildings: [{ name: 'Gedung Rektorat', floors: [{ name: 'Lantai 1', rooms: ['Ruang Pimpinan', 'Sekretariat', 'Pool Transport Pusat'] }, { name: 'Lantai 2', rooms: ['Aula Pusat', 'Ruang Rapat'] }] }, { name: 'Gudang Induk', floors: [{ name: 'Lantai 1', rooms: ['Gudang Aset', 'Bengkel Armada'] }] }] },
  smk: { campus: 'Kampus SMK IT Bina Insani', buildings: [{ name: 'Gedung Bengkel', floors: [{ name: 'Lantai 1', rooms: ['Bengkel TKJ', 'Bengkel Otomasi'] }, { name: 'Lantai 2', rooms: ['Lab Komputer 1', 'Lab Multimedia 2'] }] }, { name: 'Gedung Kelas', floors: [{ name: 'Lantai 1', rooms: ['Kelas X-1', 'Kelas X-2', 'Ruang Guru'] }] }] },
  smp: { campus: 'Kampus SMP IT Insan Kamil', buildings: [{ name: 'Gedung A', floors: [{ name: 'Lantai 1', rooms: ['Kelas 7A', 'Kelas 7B', 'Kelas 7C'] }, { name: 'Lantai 2', rooms: ['Kelas 8A', 'Kelas 8B', 'Ruang Guru'] }] }, { name: 'Gedung B', floors: [{ name: 'Lantai 1', rooms: ['Lab Sains', 'Ruang Server'] }, { name: 'Lantai 2', rooms: ['Ruang Multimedia', 'Perpustakaan'] }] }] },
  sd: { campus: 'Kampus SD IT Al-Hikmah', buildings: [{ name: 'Gedung Kelas', floors: [{ name: 'Lantai 1', rooms: ['Kelas 1', 'Kelas 2', 'Kelas 3'] }, { name: 'Lantai 2', rooms: ['Kelas 4', 'Kelas 5', 'Kelas 6'] }] }, { name: 'Gedung Aula', floors: [{ name: 'Lantai 1', rooms: ['Aula SD', 'Lab CBT SD'] }] }] },
  tk: { campus: 'Kampus TK IT Al-Falah', buildings: [{ name: 'Gedung Sentra', floors: [{ name: 'Lantai 1', rooms: ['Ruang Sentra', 'Kelas A', 'Kelas B'] }] }, { name: 'Area Luar', floors: [{ name: 'Outdoor', rooms: ['Wahana Luar', 'Joglo Bermain'] }] }] },
  rq: { campus: "Pondok Rumah Qur'an Tahfizh", buildings: [{ name: 'Gedung Halaqah', floors: [{ name: 'Lantai 1', rooms: ['Halaqah Ikhwan 1', 'Halaqah Akhwat'] }] }, { name: 'Gedung Asrama', floors: [{ name: 'Lantai 1', rooms: ['Lemari Waqaf', 'Dapur Asrama'] }] }] },
};
