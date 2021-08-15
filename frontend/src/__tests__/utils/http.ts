import http from '../../utils/http';

describe('Util: http', () => {
  it('has get property', () => {
    expect(http).toHaveProperty('get');
    expect(http.get).toBeInstanceOf(Function);
  });

  it('has defaults set correctly', () => {
    expect(http.defaults.baseURL).toBe(process.env.REACT_APP_API_BASE_URL);
    expect(http.defaults.headers).toHaveProperty('Content-Type', 'application/json');
  });
});
