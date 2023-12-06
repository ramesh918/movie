
import { lobbyValidationSchema } from '../../src/validations/lobyValidation';

describe('Lobby Validation Schema', () => {
  it('should validate a valid lobby object', () => {
    const validLobby = {
      title: 'Movie Title',
      genre: 'Action',
      rating: 8.5,
      streamingLink: 'https://example.com/movie',
    };
    const { error, value } = lobbyValidationSchema.validate(validLobby);
    expect(error).toBeFalsy();
    expect(value).toEqual(validLobby);
  });

  it('should return an error for an invalid lobby object', () => {
    const invalidLobby = {
      title: '',
      genre: 'Action',
      rating: 'not_a_number',
      streamingLink: 'invalid_url',
    };
    const { error } = lobbyValidationSchema.validate(invalidLobby);
    expect(error).toBeDefined();
  });
});
