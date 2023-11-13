export function passwordValidator(password) {
  if (!password) return "Password is required.";
  if (password.length < 6 || !/[a-zA-Z]/.test(password) || !/[^a-zA-Z0-9]/.test(password)) {
      return 'Password must be at least 6 characters long and include both letters and symbols.';
  }
  return '';
}
