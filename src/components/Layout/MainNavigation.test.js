import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { MemoryRouter } from 'react-router-dom';
import MainNavigation from './MainNavigation';
import authReducer from '../../store/authSlice';
import AuthContext from '../../store/auth-context';


const renderWithProviders = (ui, { store, authContextValue }) => {
  return render(
    <Provider store={store}>
      <AuthContext.Provider value={authContextValue}>
        <MemoryRouter>{ui}</MemoryRouter>
      </AuthContext.Provider>
    </Provider>
  );
};


const rootReducer = (state, action) => ({
  auth: authReducer(state?.auth, action),
  totalAmount: state?.totalAmount || {
    totalAmount: 0,
    isPremium: false,
    isDarkTheme: false,
  },
});

describe('MainNavigation Component', () => {
  const mockLogout = jest.fn();

  const defaultAuthContext = {
    isLoggedIn: false,
    logout: mockLogout,
  };

  const store = createStore(rootReducer, {
    auth: { isLoggedIn: false, token: null, userId: null },
    totalAmount: {
      totalAmount: 0,
      isPremium: false,
      isDarkTheme: false,
    },
  });

  test('renders MainNavigation component', () => {
    renderWithProviders(<MainNavigation />, { store, authContextValue: defaultAuthContext });
    expect(screen.getByText(/home/i)).toBeInTheDocument();
    expect(screen.getByText(/products/i)).toBeInTheDocument();
    expect(screen.getByText(/about us/i)).toBeInTheDocument();
    expect(screen.getByText(/login/i)).toBeInTheDocument();
    expect(screen.queryByText(/daily expense/i)).not.toBeInTheDocument();
  });

  test('shows Daily Expense link when logged in', () => {
    renderWithProviders(<MainNavigation />, { 
      store, 
      authContextValue: { ...defaultAuthContext, isLoggedIn: true }
    });
    expect(screen.getByText(/daily expense/i)).toBeInTheDocument();
  });

  test('calls logout handler when Logout is clicked', () => {
    renderWithProviders(<MainNavigation />, { 
      store, 
      authContextValue: { ...defaultAuthContext, isLoggedIn: true }
    });
    const logoutLink = screen.getByText(/logout/i);
    fireEvent.click(logoutLink);
    expect(mockLogout).toHaveBeenCalled();
  });

  test('applies dark theme class when isDarkTheme is true', () => {
    const darkThemeStore = createStore(rootReducer, {
      auth: { isLoggedIn: false, token: null, userId: null },
      totalAmount: {
        totalAmount: 0,
        isPremium: false,
        isDarkTheme: true,
      },
    });
    renderWithProviders(<MainNavigation />, { store: darkThemeStore, authContextValue: defaultAuthContext });
    expect(screen.getByRole('banner')).toHaveClass('headerPremium');
  });
});
