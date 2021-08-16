import { getCLS, getFCP, getFID, getLCP, getTTFB } from 'web-vitals';
import reportWebVitals from '../reportWebVitals';

jest.mock('web-vitals', () => ({
  getCLS: jest.fn(),
  getFID: jest.fn(),
  getFCP: jest.fn(),
  getLCP: jest.fn(),
  getTTFB: jest.fn()
}));

describe('reportWebVitals', () => {
  it('sets passed report handler', async () => {
    const reportHandler = () => {};

    await reportWebVitals(reportHandler);

    expect(getCLS).toHaveBeenCalledWith(reportHandler);
    expect(getFID).toHaveBeenCalledWith(reportHandler);
    expect(getFCP).toHaveBeenCalledWith(reportHandler);
    expect(getLCP).toHaveBeenCalledWith(reportHandler);
    expect(getTTFB).toHaveBeenCalledWith(reportHandler);
  });
});
