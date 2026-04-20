import { useState, useEffect } from 'react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Home from './pages/Home';
import PageLoader from './components/layout/PageLoader';
import ScrollProgress from './components/ui/ScrollProgress';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <ScrollProgress />
      {loading && <PageLoader />}
      <Home />
      <SpeedInsights />
    </>
  );
}

export default App;
