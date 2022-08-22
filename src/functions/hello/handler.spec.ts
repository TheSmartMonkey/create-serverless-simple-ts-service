import { executeLambda } from '@libs/test/utils';
import { main } from './handler';

describe('create domain', () => {
  beforeAll(async () => {
    jest.resetModules();
  });

  it('should create domain', async () => {
    // Given
    // When
    const response = await executeLambda(main, {});
    // Then
    expect(response.statusCode).toEqual(200);
    expect(true).toEqual(true);
  });
});
