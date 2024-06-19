import reducer, { setTotalAmount, premiumClicked, notPremiumClicked, notDarkClicked, darkClicked } from './totalAmountSlice';

describe('totalAmountSlice reducer', () => {
  const initialState = {
    totalAmount: 0,
    isPremium: true,
    isDarkTheme: false,
  };

  test('should handle initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  test('should handle setTotalAmount', () => {
    const actual = reducer(initialState, setTotalAmount(100));
    expect(actual.totalAmount).toEqual(100);
  });

  test('should handle premiumClicked', () => {
    const actual = reducer(initialState, premiumClicked());
    expect(actual.isPremium).toEqual(true);
  });

  test('should handle notPremiumClicked', () => {
    const actual = reducer(initialState, notPremiumClicked());
    expect(actual.isPremium).toEqual(false);
  });

  test('should handle darkClicked', () => {
    const actual = reducer(initialState, darkClicked());
    expect(actual.isDarkTheme).toEqual(true);
  });

  test('should handle notDarkClicked', () => {
    const actual = reducer(initialState, notDarkClicked());
    expect(actual.isDarkTheme).toEqual(false);
  });
});
