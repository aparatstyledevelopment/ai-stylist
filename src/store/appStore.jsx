import { createContext, useContext, useReducer } from 'react';

const AppContext = createContext(null);

const initialState = {
  drilldownTarget: null,
  activeArtifactId: null,
  chatOpen: false,
  alerts: [
    { id: 'a1', message: 'BlackRock reduced NXTK position by 400K shares (Holdings, 2024-Q3)', severity: 'warn', timestamp: '2024-10-15T08:32:00Z' },
    { id: 'a2', message: 'Swedbank Robur holds all 5 peer companies — no current NXTK position', severity: 'info', timestamp: '2024-10-14T16:00:00Z' },
    { id: 'a3', message: 'Upcoming meeting: AP3 — October 1 (2 days)', severity: 'info', timestamp: '2024-09-29T09:00:00Z' },
  ],
  scheduledWorkflows: [
    { id: 'sw1', type: 'board-pack', label: 'Monthly Board IR Pack', scheduledFor: '2024-11-01', recurrence: 'monthly' },
    { id: 'sw2', type: 'regulatory-monitor', label: 'Weekly Short Position Digest', scheduledFor: '2024-10-21', recurrence: 'weekly' },
  ],
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_DRILLDOWN':
      return { ...state, drilldownTarget: action.payload };
    case 'CLEAR_DRILLDOWN':
      return { ...state, drilldownTarget: null };
    case 'SET_ACTIVE_ARTIFACT':
      return { ...state, activeArtifactId: action.payload };
    case 'TOGGLE_CHAT':
      return { ...state, chatOpen: action.force === false ? false : !state.chatOpen };
    case 'DISMISS_ALERT':
      return { ...state, alerts: state.alerts.filter(a => a.id !== action.payload) };
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppStore() {
  return useContext(AppContext);
}
