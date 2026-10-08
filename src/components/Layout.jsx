import { useState } from 'react';
import { useApp } from '../lib/AppContext';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { AssetModal, ScanModal } from './Modals';
import { Toast } from './ui';

export function Layout({ children, query, setQuery }) {
  const { me } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showAset, setShowAset] = useState(false);
  const [showScan, setShowScan] = useState(false);
  if (!me) return <>{children}<Toast /></>;
  return (
    <div className="flex min-h-screen">
      <Sidebar mobileOpen={mobileOpen} onNav={() => setMobileOpen(false)} />
      <div className="flex-1 md:pl-72 flex flex-col min-h-screen w-full">
        <Header
          query={query}
          setQuery={setQuery}
          onMenu={() => setMobileOpen((v) => !v)}
          onAdd={() => setShowAset(true)}
          onScan={() => setShowScan(true)}
        />
        <main className="pt-16 flex-1">
          <div className="p-4 lg:p-8 flex flex-col gap-4 print-area">{children}</div>
        </main>
      </div>
      <AssetModal open={showAset} onClose={() => setShowAset(false)} />
      <ScanModal open={showScan} onClose={() => setShowScan(false)} />
      <Toast />
    </div>
  );
}
