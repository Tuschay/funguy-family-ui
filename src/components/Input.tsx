// components/Input.tsx
import type { ChangeEvent } from 'react';

interface InputProps {
  label: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  name,
  type,
  value,
  onChange,
  required,
  className = '',
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      <label htmlFor={name} className="mb-1 block font-light">
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="block w-full rounded-md border px-4 py-2 outline-none focus:outline-none focus:ring"
      />
    </div>
  );
};

export default Input;
