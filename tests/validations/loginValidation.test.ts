
import { loginValidationSchema } from '../../src/validations/loginValidation';

describe('Login Validation Schema', () => {
  it('should validate a valid login object', () => {
    const validLogin = {
      email: 'john@example.com',
      password: 'Password@123',
    };
    const { error, value } = loginValidationSchema.validate(validLogin);
    expect(error).toBeFalsy();
    expect(value).toEqual(validLogin);
  });

  it('should return an error for an invalid login object', () => {
    const invalidLogin = {
      email: 'invalidemail',
      password: 'password123',
    };
    const { error } = loginValidationSchema.validate(invalidLogin);
    expect(error).toBeDefined();
  });
});
