import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle, Eye, EyeOff, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from './input';
import { Label } from './label';
import { Button } from './button';

// Validation rule types
export interface ValidationRule {
  validate: (value: string) => boolean;
  message: string;
  type?: 'error' | 'warning' | 'info';
}

export interface ValidationSchema {
  [key: string]: ValidationRule[];
}

// Common validation patterns
export const ValidationPatterns = {
  email: {
    validate: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    message: 'Please enter a valid email address',
    type: 'error' as const
  },
  
  password: {
    validate: (value: string) => value.length >= 8,
    message: 'Password must be at least 8 characters long',
    type: 'error' as const
  },
  
  strongPassword: {
    validate: (value: string) => 
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value),
    message: 'Password must contain uppercase, lowercase, number, and special character',
    type: 'error' as const
  },
  
  phone: {
    validate: (value: string) => /^\+?[\d\s\-\(\)]{10,}$/.test(value),
    message: 'Please enter a valid phone number',
    type: 'error' as const
  },
  
  required: {
    validate: (value: string) => value.trim().length > 0,
    message: 'This field is required',
    type: 'error' as const
  },
  
  minLength: (min: number) => ({
    validate: (value: string) => value.length >= min,
    message: `Must be at least ${min} characters`,
    type: 'error' as const
  }),
  
  maxLength: (max: number) => ({
    validate: (value: string) => value.length <= max,
    message: `Must be no more than ${max} characters`,
    type: 'warning' as const
  }),
  
  url: {
    validate: (value: string) => {
      try {
        new URL(value);
        return true;
      } catch {
        return false;
      }
    },
    message: 'Please enter a valid URL',
    type: 'error' as const
  }
};

// Hook for form validation
export const useFormValidation = (schema: ValidationSchema) => {
  const [values, setValues] = React.useState<Record<string, string>>({});
  const [errors, setErrors] = React.useState<Record<string, string[]>>({});
  const [touched, setTouched] = React.useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const validateField = React.useCallback((name: string, value: string) => {
    const rules = schema[name] || [];
    const fieldErrors: string[] = [];

    rules.forEach(rule => {
      if (!rule.validate(value)) {
        fieldErrors.push(rule.message);
      }
    });

    return fieldErrors;
  }, [schema]);

  const validateForm = React.useCallback(() => {
    const formErrors: Record<string, string[]> = {};
    let isValid = true;

    Object.keys(schema).forEach(fieldName => {
      const value = values[fieldName] || '';
      const fieldErrors = validateField(fieldName, value);
      
      if (fieldErrors.length > 0) {
        formErrors[fieldName] = fieldErrors;
        isValid = false;
      }
    });

    setErrors(formErrors);
    return isValid;
  }, [values, schema, validateField]);

  const setValue = React.useCallback((name: string, value: string) => {
    setValues(prev => ({ ...prev, [name]: value }));
    
    // Real-time validation for touched fields
    if (touched[name]) {
      const fieldErrors = validateField(name, value);
      setErrors(prev => ({
        ...prev,
        [name]: fieldErrors
      }));
    }
  }, [touched, validateField]);

  const setTouched = React.useCallback((name: string) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    
    // Validate when field is touched
    const value = values[name] || '';
    const fieldErrors = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: fieldErrors
    }));
  }, [values, validateField]);

  const reset = React.useCallback(() => {
    setValues({});
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, []);

  const handleSubmit = React.useCallback(async (
    onSubmit: (values: Record<string, string>) => Promise<void> | void
  ) => {
    setIsSubmitting(true);
    
    // Mark all fields as touched
    const allTouched: Record<string, boolean> = {};
    Object.keys(schema).forEach(key => {
      allTouched[key] = true;
    });
    setTouched(allTouched);

    const isValid = validateForm();
    
    if (isValid) {
      try {
        await onSubmit(values);
      } catch (error) {
        console.error('Form submission error:', error);
      }
    }
    
    setIsSubmitting(false);
  }, [values, schema, validateForm]);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    setValue,
    setTouched,
    validateForm,
    reset,
    handleSubmit,
    isValid: Object.keys(errors).length === 0
  };
};

// Enhanced input component with validation
interface ValidatedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  errors?: string[];
  touched?: boolean;
  showValidIcon?: boolean;
  hint?: string;
  onValueChange?: (value: string) => void;
  onBlurCapture?: () => void;
}

export const ValidatedInput = React.forwardRef<HTMLInputElement, ValidatedInputProps>(({
  name,
  label,
  errors = [],
  touched = false,
  showValidIcon = true,
  hint,
  onValueChange,
  onBlurCapture,
  className,
  type = 'text',
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [focused, setFocused] = React.useState(false);
  
  const hasErrors = errors.length > 0 && touched;
  const isValid = touched && errors.length === 0 && props.value;
  const isPassword = type === 'password';
  const inputType = isPassword && showPassword ? 'text' : type;

  return (
    <div className="space-y-2">
      {label && (
        <Label 
          htmlFor={name}
          className={cn(
            "text-sm font-medium transition-colors",
            hasErrors ? "text-red-400" : "text-siso-text-primary",
            focused && "text-siso-orange"
          )}
        >
          {label}
          {props.required && <span className="text-red-400 ml-1">*</span>}
        </Label>
      )}
      
      <div className="relative">
        <Input
          ref={ref}
          id={name}
          name={name}
          type={inputType}
          className={cn(
            "transition-all duration-200",
            hasErrors && "border-red-500/50 focus:border-red-500 focus:ring-red-500/20",
            isValid && "border-green-500/50 focus:border-green-500 focus:ring-green-500/20",
            focused && !hasErrors && !isValid && "border-siso-orange/50 focus:border-siso-orange",
            className
          )}
          onChange={(e) => onValueChange?.(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => {
            setFocused(false);
            onBlurCapture?.();
          }}
          aria-invalid={hasErrors}
          aria-describedby={`${name}-hint ${name}-error`}
          {...props}
        />
        
        {/* Status icon */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
          {isPassword && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-auto p-0 hover:bg-transparent"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4 text-siso-text-muted hover:text-siso-text-primary" />
              ) : (
                <Eye className="h-4 w-4 text-siso-text-muted hover:text-siso-text-primary" />
              )}
            </Button>
          )}
          
          {showValidIcon && (
            <AnimatePresence mode="wait">
              {hasErrors && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <AlertCircle className="h-4 w-4 text-red-400" />
                </motion.div>
              )}
              {isValid && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <CheckCircle className="h-4 w-4 text-green-400" />
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      </div>
      
      {/* Hint text */}
      {hint && !hasErrors && (
        <div id={`${name}-hint`} className="flex items-center gap-1 text-xs text-siso-text-muted">
          <Info className="h-3 w-3" />
          {hint}
        </div>
      )}
      
      {/* Error messages */}
      <AnimatePresence>
        {hasErrors && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div id={`${name}-error`} className="space-y-1" role="alert">
              {errors.map((error, index) => (
                <div key={index} className="flex items-center gap-2 text-xs text-red-400">
                  <AlertCircle className="h-3 w-3 flex-shrink-0" />
                  {error}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

ValidatedInput.displayName = 'ValidatedInput';

// Form wrapper component
interface FormWrapperProps {
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent) => void;
  className?: string;
  noValidate?: boolean;
}

export const FormWrapper: React.FC<FormWrapperProps> = ({
  children,
  onSubmit,
  className,
  noValidate = true
}) => {
  return (
    <form
      onSubmit={onSubmit}
      className={cn("space-y-6", className)}
      noValidate={noValidate}
      autoComplete="on"
    >
      {children}
    </form>
  );
};

export default ValidatedInput;