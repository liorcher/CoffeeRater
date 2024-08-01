// Mock the GoogleStrategy
jest.mock("passport-google-oauth20", () => {
  return {
    Strategy: jest.fn().mockImplementation(() => {
      return {
        authenticate: jest.fn((req, res, next) => next()),
      };
    }),
  };
});
