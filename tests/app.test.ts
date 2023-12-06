import request from 'supertest';
import app from '../src/app';

describe('Express App Setup', () => {
  it('should have CORS enabled', async () => {
    const response = await request(app).get('/'); // Perform a test request
    expect(response.header['access-control-allow-origin']).toEqual('*');
  });

  it('should handle routes defined in the index file', async () => {
    const response = await request(app).get('/api'); // Test a route defined in your routes/index.ts
    expect(response.status).toBe(404);
  });
});
