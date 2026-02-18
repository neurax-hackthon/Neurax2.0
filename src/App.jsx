import { useState, useEffect } from 'react';
import Home from './pages/Home';
import PageLoader from './components/layout/PageLoader';
import CustomCursor from './components/layout/CustomCursor';
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
      <CustomCursor />
      {loading && <PageLoader />}
      <Home />
    </>
  );
}

export default App;
