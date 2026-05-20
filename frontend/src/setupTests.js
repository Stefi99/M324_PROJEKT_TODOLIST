import "@testing-library/jest-dom";

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve([]),
    }),
  );
});

afterEach(() => {
  jest.clearAllMocks();
});
