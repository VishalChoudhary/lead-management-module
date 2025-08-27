export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePhone = (phone) => {
  const re = /^[\+]?[1-9][\d]{0,15}$/;
  return re.test(phone.replace(/\s/g, ''));
};

export const validateForm = (formData) => {
  const errors = {};

  if (!formData.name?.trim()) errors.name = 'Name is required';
  if (!formData.email?.trim()) errors.email = 'Email is required';
  else if (!validateEmail(formData.email)) errors.email = 'Invalid email format';
  if (!formData.phone?.trim()) errors.phone = 'Phone is required';
  else if (!validatePhone(formData.phone)) errors.phone = 'Invalid phone format';
  if (!formData.company?.trim()) errors.company = 'Company is required';

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};