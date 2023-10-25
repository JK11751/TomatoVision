export function passwordValidator(password) {
  if (!password) return "Password can't be empty.";
  
  // Define regular expressions for letters, numbers, and special characters
  const letterRegex = /[a-zA-Z]/;
  const numberRegex = /[0-9]/;
  const specialCharacterRegex = /[^a-zA-Z0-9]/;

  // Check if the password contains at least one letter, one number, and one special character
  if (
    !letterRegex.test(password) ||
    !numberRegex.test(password) ||
    !specialCharacterRegex.test(password)
  ) {
    return 'Password must include at least one letter, one number, and one special character.';
  }

  // Check if the password is at least 8 characters long
  if (password.length < 5) {
    return 'Password must be at least 5 characters long.';
  }

  return '';
}
