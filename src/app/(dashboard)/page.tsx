import { DashboardView } from '@/features/dashboard/components/dashboard-view';
import { Suspense } from 'react';

const HomePage = () => {
  return (
    <Suspense>
      <DashboardView />
    </Suspense>
  );
};

export default HomePage;
