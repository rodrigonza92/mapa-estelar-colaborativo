const request = require('supertest');
const index = require('../index'); 

describe('GET /fotografias', () => {
  it('should return all photographs', async () => {
    const response = await request(index).get('/fotografias');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should return 500 if there is a database error', async () => {
    jest.spyOn(db, 'query').mockImplementationOnce(() => {
      throw new Error('Database error');
    });
    const response = await request(index).get('/fotografias');
    expect(response.status).toBe(500);
    expect(response.body.error).toBe('Database error');
  });
});