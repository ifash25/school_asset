import { DashTop, useDistMode } from './dash1';
import { Distribusi, FundCat } from './dash2';
import { Alerts, StatusAudit } from './dash3';

export function Dashboard() {
  const [mode, setMode] = useDistMode();
  return (
    <>
      <DashTop />
      <Distribusi mode={mode} setMode={setMode} />
      <FundCat />
      <Alerts />
      <StatusAudit />
    </>
  );
}
