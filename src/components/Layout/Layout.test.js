import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Layout from './Layout';
import MainNavigation from './MainNavigation';
import authReducer from '../../store/authSlice';
import totalAmountReducer from '../../store/totalAmountSlice';


jest.mock('./MainNavigation', () => () => <div>Main Navigation</div>);


const rootReducer = (state = {}, action) => ({
  auth: authReducer(state.auth, action),
  totalAmount: totalAmountReducer(state.totalAmount, action),
});

const renderWithProviders = (ui, { store } = {}) => {
  return render(
    <Provider store={store}>
      {ui}
    </Provider>
  );
};

describe('Layout Component', () => {
  const initialState = {
    auth: { isLoggedIn: false, token: null, userId: null },
    totalAmount: {
      totalAmount: 0,
      isPremium: false,
      isDarkTheme: false,
    },
  };

  test('renders Layout component with children', () => {
    const store = createStore(rootReducer, initialState);
    renderWithProviders(<Layout><div>Test Child</div></Layout>, { store });

    expect(screen.getByText('Main Navigation')).toBeInTheDocument();
    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });

  test('applies dark theme class when isDarkTheme is true', () => {
    const darkThemeState = {
      ...initialState,
      totalAmount: {
        ...initialState.totalAmount,
        isDarkTheme: true,
      },
    };

    const store = createStore(rootReducer, darkThemeState);
    renderWithProviders(<Layout><div>Test Child</div></Layout>, { store });

    expect(screen.getByText('Main Navigation')).toBeInTheDocument();
    expect(screen.getByText('Test Child')).toBeInTheDocument();
    expect(screen.getByRole('main')).toHaveClass('premiumBackground');
  });
});
