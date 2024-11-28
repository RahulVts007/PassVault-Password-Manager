export const calculatePasswordStrength = (password: string): number => {
  let strength = 0;
  
  // Length check
  if (password.length >= 8) strength += 1;
  if (password.length >= 12) strength += 1;
  if (password.length >= 16) strength += 1;
  
  // Character variety checks
  if (/[A-Z]/.test(password)) strength += 1;
  if (/[a-z]/.test(password)) strength += 1;
  if (/[0-9]/.test(password)) strength += 1;
  if (/[^A-Za-z0-9]/.test(password)) strength += 1;
  
  // Additional checks for better security
  if (/(.)\1{2,}/.test(password)) strength -= 1; // Penalize repeating characters
  if (password.length >= 8 && /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$/.test(password)) {
    strength += 1; // Bonus for having all character types
  }
  
  return Math.min(Math.max(strength, 0), 5); // Ensure strength is between 0 and 5
};

export const getStrengthColor = (strength: number): string => {
  const colors = ['red-500', 'orange-500', 'yellow-500', 'blue-500', 'green-500'];
  return colors[strength - 1] || 'gray-300';
};

export const getStrengthLabel = (strength: number): string => {
  const labels = ['Very Weak', 'Weak', 'Moderate', 'Strong', 'Very Strong'];
  return labels[strength - 1] || 'No Password';
};