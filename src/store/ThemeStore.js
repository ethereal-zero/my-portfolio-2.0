import React, { createContext, useContext, useReducer } from 'react';

/* ----------------------------------
   Helpers
---------------------------------- */
const isClient = typeof window !== 'undefined';

const getSession = (key, fallback = '') => {
  if (!isClient) return fallback;
  return sessionStorage.getItem(key) ?? fallback;
};

const setSession = (key, value) => {
  if (!isClient) return;
  sessionStorage.setItem(key, value);
};

/* ----------------------------------
   Initial State (Vuex state)
---------------------------------- */
const initialState = {
  isDark: getSession('isDark', 'false') === 'true',
  themes: getSession('themes', ''),
  buttons: getSession('buttons', ''),
  notifications: getSession('notifications', ''),
  headers: getSession('headers', ''),
  footers: getSession('footers', ''),
  logo: getSession('logo', ''),
  footerlogo: getSession('footerLogo', ''),
  backgroundlogo: getSession('backgroundLogo', ''),
};

/* ----------------------------------
   Reducer (Vuex mutations)
---------------------------------- */
function themeReducer(state, action) {
  switch (action.type) {
    case 'SET_COLOR_SCHEME':
      setSession('isDark', action.payload);
      return { ...state, isDark: action.payload };

    case 'SET_THEME':
      setSession('themes', JSON.stringify(action.payload));
      return { ...state, themes: JSON.stringify(action.payload) };

    case 'SET_BUTTON_THEME':
      setSession('buttons', JSON.stringify(action.payload));
      return { ...state, buttons: JSON.stringify(action.payload) };

    case 'SET_NOTIFICATION_THEME':
      setSession('notifications', JSON.stringify(action.payload));
      return { ...state, notifications: JSON.stringify(action.payload) };

    case 'SET_HEADER_THEME':
      setSession('headers', JSON.stringify(action.payload));
      return { ...state, headers: JSON.stringify(action.payload) };

    case 'SET_FOOTER_THEME':
      setSession('footers', JSON.stringify(action.payload));
      return { ...state, footers: JSON.stringify(action.payload) };

    case 'SET_LOGO':
      setSession('logo', action.payload);
      return { ...state, logo: action.payload };

    case 'SET_FOOTER_LOGO':
      setSession('footerLogo', action.payload);
      return { ...state, footerlogo: action.payload };

    case 'SET_BACKGROUND_LOGO':
      setSession('backgroundLogo', action.payload);
      return { ...state, backgroundlogo: action.payload };

    default:
      return state;
  }
}

/* ----------------------------------
   Context
---------------------------------- */
const ThemeContext = createContext(null);

/* ----------------------------------
   Provider
---------------------------------- */
export function ThemeProvider({ children }) {
  const [state, dispatch] = useReducer(themeReducer, initialState);

  return (
    <ThemeContext.Provider value={{ state, dispatch }}>
      {children}
    </ThemeContext.Provider>
  );
}

/* ----------------------------------
   Getters (Vuex getters)
---------------------------------- */
export function useThemeStore() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeStore must be used inside ThemeProvider');
  }

  const { state, dispatch } = context;

  return {
    /* getters */
    isDark: state.isDark ?? false,
    theme: state.themes ? JSON.parse(state.themes) : null,
    buttonTheme: state.buttons ? JSON.parse(state.buttons) : null,
    notificationTheme: state.notifications
      ? JSON.parse(state.notifications)
      : null,
    headerTheme: state.headers ? JSON.parse(state.headers) : null,
    footerTheme: state.footers ? JSON.parse(state.footers) : null,
    logo: state.logo,
    footerLogo: state.footerlogo,
    backgroundLogo: state.backgroundlogo,

    /* mutations */
    setColorScheme: (value) =>
      dispatch({ type: 'SET_COLOR_SCHEME', payload: value }),

    setColorTheme: (value) =>
      dispatch({ type: 'SET_THEME', payload: value }),

    setButtonTheme: (value) =>
      dispatch({ type: 'SET_BUTTON_THEME', payload: value }),

    setNotificationTheme: (value) =>
      dispatch({ type: 'SET_NOTIFICATION_THEME', payload: value }),

    setHeaderTheme: (value) =>
      dispatch({ type: 'SET_HEADER_THEME', payload: value }),

    setFooterTheme: (value) =>
      dispatch({ type: 'SET_FOOTER_THEME', payload: value }),

    setLogo: (value) =>
      dispatch({ type: 'SET_LOGO', payload: value }),

    setFooterLogo: (value) =>
      dispatch({ type: 'SET_FOOTER_LOGO', payload: value }),

    setBackgroundLogo: (value) =>
      dispatch({ type: 'SET_BACKGROUND_LOGO', payload: value }),
  };
}
