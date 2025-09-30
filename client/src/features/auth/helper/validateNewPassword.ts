export function validateNewPassword(password1:string, password2:string): string|null {
  if (password1 !== password2) {
    return 'auth.errors.passwordNotEqual';
  }

  if (password1.length < 6) {
    return 'auth.errors.passwordShort';
  }

  return null;
}