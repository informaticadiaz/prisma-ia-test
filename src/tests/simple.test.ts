import { describe, it, expect } from 'vitest';

describe('Suite de prueba simple', () => {
  it('should pass a basic test', () => {
    console.log('--- Ejecutando test simple ---');
    expect(1 + 1).toBe(2);
  });
});
