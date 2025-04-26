import { HashService } from './hash.service';

describe('HashService', () => {
  let service: HashService;

  beforeEach(() => {
    service = new HashService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should generate correct SHA-256 hash for "hello"', async () => {
    const result = await service.getHashString('hello');
    // Precomputed SHA-256 hash of "hello"
    const expected = '2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824';
    expect(result).toBe(expected);
  });
});
