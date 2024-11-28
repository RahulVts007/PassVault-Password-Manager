const CHARS = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
};

export const generatePassword = (
  length: number = 16,
  options = {
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  }
): string => {
  let chars = '';
  if (options.uppercase) chars += CHARS.uppercase;
  if (options.lowercase) chars += CHARS.lowercase;
  if (options.numbers) chars += CHARS.numbers;
  if (options.symbols) chars += CHARS.symbols;

  let password = '';
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return password;
};