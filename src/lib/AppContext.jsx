import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { currentUser as getCurrentUser, doLogin as tryLogin, doLogout as clearSession } from './auth';
import { loadStore, STORE_KEY } from './store';

const AppCtx = createContext(null);

export function AppProvider({ children }) {
  const [store, setStore] = useState(() => loadStore());
  const [me, setMe] = useState(() => getCurrentUser(store.extraUsers));
  const [toastMsg, setToastMsg] = useState('');

  useEffect(() => {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(store)); } catch {}
  }, [store]);

  const toast = useCallback((m) => {
    setToastMsg(m);
    window.clearTimeout(toast._t);
    toast._t = window.setTimeout(() => setToastMsg(''), 2600);
  }, []);

  // lock unit scope for non super admin (migrated from index.html inline script)
  useEffect(() => {
    if (me && me.role !== 'super_admin' && store.unit !== me.unit) {
      setStore((s) => ({ ...s, unit: me.unit }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [me]);

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

  const value = useMemo(() => ({ store, setStore, me, setMe, login, logout, toast, toastMsg }), [store, me, login, logout, toast, toastMsg]);
  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>;
}

export function useApp() {
  const ctx = useContext(AppCtx);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
