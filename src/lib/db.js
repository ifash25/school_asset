import { supabase, isSupabaseConfigured } from './supabase';
import { seed } from './store';

export const useSupabase = () => isSupabaseConfigured && supabase;

function mapAsset(r) {
  return { code: r.code, name: r.name, unit: r.unit, room: r.room, cat: r.cat, value: Number(r.value || 0), cond: r.cond, fund: r.fund, icon: r.icon || 'inventory_2' };
}
function mapLoan(r) {
  return { id: r.id, item: r.item, by: r.borrower, status: r.status, due: r.due };
}
function mapAlert(r) {
  return { id: r.id, code: r.code, issue: r.issue, vendor: r.vendor, due: r.due, tone: r.tone, action: r.action };
}
function mapActivity(r) {
  return { id: r.id, t: r.title, c: r.color, time: r.time, d: r.detail, m: r.meta };
}
function mapUser(r) {
  return { username: r.username, pass: r.pass, name: r.name, role: r.role, unit: r.unit };
}

export async function fetchAll() {
  const s = seed();
  if (!useSupabase()) return s;
  try {
    const [a, l, al, ac, u] = await Promise.all([
      supabase.from('assets').select('*').order('created_at', { ascending: false }),
      supabase.from('loans').select('*').order('created_at', { ascending: false }),
      supabase.from('alerts').select('*').order('created_at', { ascending: false }),
      supabase.from('activities').select('*').order('created_at', { ascending: false }),
      supabase.from('app_users').select('*').order('created_at', { ascending: false }),
    ]);
    if (a.error) throw a.error;
    return {
      ...s,
      assets: (a.data || []).map(mapAsset),
      loans: (l.data || []).map(mapLoan),
      alerts: (al.data || []).map(mapAlert),
      activities: (ac.data || []).map(mapActivity),
      extraUsers: (u.data || []).map(mapUser),
    };
  } catch {
    return s;
  }
}

export async function dbInsertAsset(row) {
  if (!useSupabase()) return null;
  const { error } = await supabase.from('assets').insert({
    code: row.code, name: row.name, unit: row.unit, room: row.room,
    cat: row.cat, value: row.value, cond: row.cond, fund: row.fund, icon: row.icon,
  });
  if (error) throw error;
  return true;
}

export async function dbUpdateAsset(code, patch) {
  if (!useSupabase()) return null;
  const { error } = await supabase.from('assets').update({
    ...(patch.name !== undefined ? { name: patch.name } : {}),
    ...(patch.unit !== undefined ? { unit: patch.unit } : {}),
    ...(patch.room !== undefined ? { room: patch.room } : {}),
    ...(patch.cat !== undefined ? { cat: patch.cat } : {}),
    ...(patch.value !== undefined ? { value: patch.value } : {}),
    ...(patch.cond !== undefined ? { cond: patch.cond } : {}),
    ...(patch.fund !== undefined ? { fund: patch.fund } : {}),
  }).eq('code', code);
  if (error) throw error;
  return true;
}

export async function dbInsertLoan(row) {
  if (!useSupabase()) return null;
  const { data, error } = await supabase.from('loans').insert({
    item: row.item, borrower: row.by, status: row.status, due: row.due,
  }).select().single();
  if (error) throw error;
  return mapLoan(data);
}

export async function dbInsertActivity(row) {
  if (!useSupabase()) return null;
  const { data, error } = await supabase.from('activities').insert({
    title: row.t, color: row.c || 'primary', time: row.time || 'Baru saja',
    detail: row.d || '', meta: row.m || '',
  }).select().single();
  if (error) throw error;
  return mapActivity(data);
}

export async function dbInsertUser(row) {
  if (!useSupabase()) return null;
  const { error } = await supabase.from('app_users').insert({
    username: row.username, pass: row.pass || '123456',
    name: row.name, role: row.role, unit: row.unit,
  });
  if (error) throw error;
  return true;
}

export async function dbDeleteAsset(code) {
  if (!useSupabase()) return null;
  const { error } = await supabase.from('assets').delete().eq('code', code);
  if (error) throw error;
  return true;
}

export async function dbDeleteLoan(id) {
  if (!useSupabase()) return null;
  const { error } = await supabase.from('loans').delete().eq('id', id);
  if (error) throw error;
  return true;
}

export async function dbUpdateLoan(id, patch) {
  if (!useSupabase()) return null;
  const { error } = await supabase.from('loans').update({
    ...(patch.item !== undefined ? { item: patch.item } : {}),
    ...(patch.by !== undefined ? { borrower: patch.by } : {}),
    ...(patch.status !== undefined ? { status: patch.status } : {}),
    ...(patch.due !== undefined ? { due: patch.due } : {}),
  }).eq('id', id);
  if (error) throw error;
  return true;
}

export async function dbDeleteUser(username) {
  if (!useSupabase()) return null;
  const { error } = await supabase.from('app_users').delete().eq('username', username);
  if (error) throw error;
  return true;
}

export async function getMissingTables() {
  if (!useSupabase()) return [];
  const tables = ['assets', 'loans', 'alerts', 'activities', 'app_users'];
  const missing = [];
  for (const t of tables) {
    try {
      const r = await supabase.from(t).select('*', { count: 'exact', head: true });
      if (r.error && (r.error.code === 'PGRST205' || /schema cache/i.test(r.error.message || ''))) missing.push(t);
      else if (r.error && r.status === 404) missing.push(t);
    } catch {
      missing.push(t);
    }
  }
  return missing;
}

export async function seedIfEmpty() {
  if (!useSupabase()) return false;
  try {
    const { count } = await supabase.from('assets').select('code', { count: 'exact', head: true });
    if ((count || 0) > 0) return false;
    const s = seed();
    await supabase.from('assets').insert(s.assets.map((a) => ({
      code: a.code, name: a.name, unit: a.unit, room: a.room,
      cat: a.cat, value: a.value, cond: a.cond, fund: a.fund, icon: a.icon,
    })));
    await supabase.from('loans').insert(s.loans.map((l) => ({ item: l.item, borrower: l.by, status: l.status, due: l.due })));
    await supabase.from('alerts').insert(s.alerts.map((a) => ({ code: a.code, issue: a.issue, vendor: a.vendor, due: a.due, tone: a.tone, action: a.action })));
    await supabase.from('activities').insert(s.activities.map((a) => ({ title: a.t, color: a.c, time: a.time, detail: a.d, meta: a.m })));
    return true;
  } catch {
    return false;
  }
}
