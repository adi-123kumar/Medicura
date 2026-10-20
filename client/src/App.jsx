import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { GuidanceProvider } from './features/guidance/GuidanceContext';

export default function App() {
  return (
    <BrowserRouter>
      <GuidanceProvider>
        <AppRoutes />
      </GuidanceProvider>
    </BrowserRouter>
  );
}
