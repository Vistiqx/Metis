import { test, expect } from '@playwright/test';

test.describe('Metis Platform - API End-to-End Tests', () => {
  const apiBaseUrl = 'http://localhost:8081';

  test('API health endpoint should return healthy status', async ({ request }) => {
    const response = await request.get(`${apiBaseUrl}/health`);
    expect(response.status()).toBe(200);
    
    const body = await response.json();
    expect(body).toHaveProperty('status', 'healthy');
  });

  test('API root endpoint should return application info', async ({ request }) => {
    const response = await request.get(`${apiBaseUrl}/`);
    expect(response.status()).toBe(200);
    
    const body = await response.json();
    expect(body).toHaveProperty('name', 'Metis');
    expect(body).toHaveProperty('version');
    expect(body).toHaveProperty('status', 'operational');
  });

  test('API status endpoint should be accessible', async ({ request }) => {
    const response = await request.get(`${apiBaseUrl}/api/v1/status`);
    expect(response.status()).toBe(200);
    
    const body = await response.json();
    expect(body).toHaveProperty('status', 'ok');
    expect(body).toHaveProperty('version');
  });

  test('API documentation endpoint should be accessible', async ({ request }) => {
    const response = await request.get(`${apiBaseUrl}/docs`);
    expect(response.status()).toBe(200);
  });

  test('Authentication endpoints should exist', async ({ request }) => {
    // Test login endpoint (should fail without credentials but endpoint should exist)
    const loginResponse = await request.post(`${apiBaseUrl}/api/v1/auth/login`, {
      data: {
        username: 'test',
        password: 'test'
      }
    });
    
    // Should return 401 for invalid credentials, not 404
    expect([200, 401, 422]).toContain(loginResponse.status());
  });

  test('Cases endpoint structure validation', async ({ request }) => {
    // Try to access cases endpoint without auth
    const response = await request.get(`${apiBaseUrl}/api/v1/cases`);
    
    // Should be protected (401/403) or return data (200)
    expect([200, 401, 403]).toContain(response.status());
    
    if (response.status() === 200) {
      const body = await response.json();
      expect(Array.isArray(body) || typeof body === 'object').toBe(true);
    }
  });

  test('Events endpoint structure validation', async ({ request }) => {
    const response = await request.get(`${apiBaseUrl}/api/v1/events`);
    
    expect([200, 401, 403]).toContain(response.status());
    
    if (response.status() === 200) {
      const body = await response.json();
      expect(Array.isArray(body) || typeof body === 'object').toBe(true);
    }
  });
});
