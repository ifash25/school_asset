import { Navigate } from 'react-router-dom';
import { useApp } from '../lib/AppContext';
import { canAccess } from '../lib/auth';

export function RequireAuth({ children, menu }) {
  const { me, toast } = useApp();
  if (!me) return <Navigate to="/login" replace />;
  if (menu && !canAccess(me, menu)) {
    toast('Menu tidak tersedia untuk peran Anda');
    return <Navigate to="/" replace />;
  }
  return children;
}
