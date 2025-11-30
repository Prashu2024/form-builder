export const validateField = (value, field) => {
  if (field.required && (!value || (Array.isArray(value) && value.length === 0))) {
    return `${field.label} is required`;
  }

  if (field.validation) {
    const v = field.validation;

    if (v.minLength && value && value.length < v.minLength) {
      return `Minimum ${v.minLength} characters required`;
    }

    if (v.maxLength && value && value.length > v.maxLength) {
      return `Maximum ${v.maxLength} characters allowed`;
    }

    if (v.regex && value && !new RegExp(v.regex).test(value)) {
      return v.regexMessage || 'Invalid format';
    }

    if (v.min !== undefined && value < v.min) {
      return `Minimum value is ${v.min}`;
    }

    if (v.max !== undefined && value > v.max) {
      return `Maximum value is ${v.max}`;
    }

    if (v.minDate && value && new Date(value) < new Date(v.minDate)) {
      return `Date must be after ${v.minDate}`;
    }

    if (v.minSelected && Array.isArray(value) && value.length < v.minSelected) {
      return `Select at least ${v.minSelected} option(s)`;
    }

    if (v.maxSelected && Array.isArray(value) && value.length > v.maxSelected) {
      return `Select at most ${v.maxSelected} option(s)`;
    }
  }

  return undefined;
};