import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import GuidanceModal from './GuidanceModal';

const GuidanceContext = createContext(null);

/** Wrap the app once; any "Get Guidance" button calls openGuidance({ college? }). */
export function GuidanceProvider({ children }) {
  const [state, setState] = useState({ open: false, college: null });
  const openGuidance = useCallback((options = {}) => setState({ open: true, college: options.college || null }), []);
  const closeGuidance = useCallback(() => setState((s) => ({ ...s, open: false })), []);
  const value = useMemo(() => ({ openGuidance, closeGuidance }), [openGuidance, closeGuidance]);

  return (
    <GuidanceContext.Provider value={value}>
      {children}
      <GuidanceModal open={state.open} college={state.college} onClose={closeGuidance} />
    </GuidanceContext.Provider>
  );
}

export const useGuidance = () => {
  const ctx = useContext(GuidanceContext);
  if (!ctx) throw new Error('useGuidance must be used inside <GuidanceProvider>');
  return ctx;
};
