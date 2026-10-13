import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { currentUser as getCurrentUser, doLogin as tryLogin, doLogout as clearSession } from './auth';
import { loadStore, STORE_KEY } from './store';
import { fetchAll, seedIfEmpty, getMissingTables, dbInsertAsset, dbUpdateAsset, dbDeleteAsset, dbInsertLoan, dbUpdateLoan, dbDeleteLoan, dbInsertActivity, dbInsertUser, dbDeleteUser, useSupabase } from './db';

const AppCtx = createContext(null);

export function AppProvider({ children }) {
  const [store, setStore] = useState(() => loadStore());
  const [me, setMe] = useState(() => getCurrentUser(store.extraUsers));
  const [toastMsg, setToastMsg] = useState('');
  const [dbReady, setDbReady] = useState(false);
  const [missingTables, setMissingTables] = useState([]);

  const toast = useCallback((m) => {
    setToastMsg(m);
    window.clearTimeout(toast._t);
    toast._t = window.setTimeout(() => setToastMsg(''), 2600);
  }, []);

  useEffect(() => {
    let alive = true;
    (async () => {
      if (!useSupabase()) return;
      const missing = await getMissingTables();
      if (!alive) return;
      setMissingTables(missing);
      if (missing.length > 0) return;
      await seedIfEmpty();
      const remote = await fetchAll();
      if (!alive) return;
      setStore((s) => ({ ...remote, unit: s.unit || remote.unit || 'all' }));
      setDbReady(true);
    })();
    return () => { alive = false; };
  }, []);

  useEffect(() => {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(store)); } catch {}
  }, [store]);


  // lock unit scope for non super admin (migrated from index.html inline script)
  useEffect(() => {
    if (me && me.role !== 'super_admin' && store.unit !== me.unit) {
      setStore((s) => ({ ...s, unit: me.unit }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [me]);

  // refresh sesi setelah extraUsers dari Supabase termuat
  useEffect(() => {
    if (dbReady && !me) {
      const w = getCurrentUser(store.extraUsers);
      if (w) setMe(w);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dbReady]);

  const login = useCallback((u, p) => {
    const w = tryLogin(u, p, store.extraUsers);
    if (!w) return null;
    setMe(w);
    return w;
  }, [store.extraUsers]);

  const logout = useCallback(() => {
    clearSession();
    setMe(null);
  }, []);

  const addAsset = useCallback(async (row, activity) => {
    setStore((s) => ({
      ...s,
      assets: [row, ...s.assets],
      activities: activity ? [activity, ...s.activities] : s.activities,
    }));
    if (useSupabase()) {
      try {
        await dbInsertAsset(row);
        if (activity) await dbInsertActivity(activity);
      } catch (e) { toast('Gagal simpan ke Supabase: ' + e.message); }
    }
  }, [toast]);

  const addLoan = useCallback(async (row) => {
    setStore((s) => ({ ...s, loans: [row, ...s.loans] }));
    if (useSupabase()) {
      try { await dbInsertLoan(row); }
      catch (e) { toast('Gagal simpan ke Supabase: ' + e.message); }
    }
  }, [toast]);

  const addActivity = useCallback(async (row) => {
    setStore((s) => ({ ...s, activities: [row, ...s.activities] }));
    if (useSupabase()) {
      try { await dbInsertActivity(row); }
      catch (e) { toast('Gagal simpan ke Supabase: ' + e.message); }
    }
  }, [toast]);

  const addUser = useCallback(async (row) => {
    setStore((s) => ({ ...s, extraUsers: [...(s.extraUsers || []), row] }));
    if (useSupabase()) {
      try { await dbInsertUser(row); }
      catch (e) { toast('Gagal simpan ke Supabase: ' + e.message); }
    }
  }, [toast]);

  const updateAsset = useCallback(async (code, patch) => {
    setStore((s) => ({ ...s, assets: s.assets.map((a) => (a.code === code ? { ...a, ...patch } : a)) }));
    if (useSupabase()) {
      try { await dbUpdateAsset(code, patch); }
      catch (e) { toast('Gagal update ke Supabase: ' + e.message); }
    }
  }, [toast]);

  const removeAsset = useCallback(async (code) => {
    setStore((s) => ({ ...s, assets: s.assets.filter((a) => a.code !== code) }));
    if (useSupabase()) {
      try { await dbDeleteAsset(code); }
      catch (e) { toast('Gagal hapus di Supabase: ' + e.message); }
    }
  }, [toast]);

  const updateLoan = useCallback(async (id, patch) => {
    setStore((s) => ({ ...s, loans: s.loans.map((l, i) => ((l.id ?? i) === id ? { ...l, ...patch } : l)) }));
    if (useSupabase() && id !== undefined && typeof id === 'number') {
      try { await dbUpdateLoan(id, patch); }
      catch (e) { toast('Gagal update ke Supabase: ' + e.message); }
    }
  }, [toast]);

  const removeLoan = useCallback(async (id) => {
    setStore((s) => ({ ...s, loans: s.loans.filter((l, i) => (l.id ?? i) !== id) }));
    if (useSupabase() && typeof id === 'number') {
      try { await dbDeleteLoan(id); }
      catch (e) { toast('Gagal hapus di Supabase: ' + e.message); }
    }
  }, [toast]);

  const removeUser = useCallback(async (username) => {
    setStore((s) => ({ ...s, extraUsers: (s.extraUsers || []).filter((u) => u.username !== username) }));
    if (useSupabase()) {
      try { await dbDeleteUser(username); }
      catch (e) { toast('Gagal hapus di Supabase: ' + e.message); }
    }
  }, [toast]);

  const value = useMemo(() => ({ store, setStore, me, setMe, login, logout, toast, toastMsg, dbReady, missingTables, addAsset, addLoan, addActivity, addUser, updateAsset, removeAsset, updateLoan, removeLoan, removeUser }), [store, me, login, logout, toast, toastMsg, dbReady, missingTables, addAsset, addLoan, addActivity, addUser, updateAsset, removeAsset, updateLoan, removeLoan, removeUser]);
  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>;
}

export function useApp() {
  const ctx = useContext(AppCtx);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
