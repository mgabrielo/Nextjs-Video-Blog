"use client";
import {
  FieldErrors,
  FieldValues,
  UseFormRegister,
  ValidationRule,
} from "react-hook-form";
type InputProps = {
  id?: string;
  label?: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  pattern: ValidationRule<RegExp>;
  className?: string;
  placeholder?: string;
};

const Input = ({
  id = "",
  label,
  type = "text",
  disabled = false,
  errors,
  register,
  pattern,
  className,
  required,
  placeholder = "",
}: InputProps) => {
  return (
    <div className={`relative ${className}`}>
      <input
        type={type}
        className={`peer w-full px-4 py-2 rounded-md outline-none border-[1px] bg-zinc-800 transition ${
          errors[id]
            ? "border-red-500 focus:border-red-500"
            : "border-zinc-500 focus:border-blue-400"
        } disabled:opacity-70 disabled:cursor-not-allowed`}
        id={id}
        disabled={disabled}
        {...register(id, { required, pattern })}
        placeholder={placeholder}
      />

      <label
        htmlFor={id}
        className={`absolute bg-zinc-800 px-2 top-2 left-2 z-[1] duration-100 -translate-y-5 transform-origin-[0px] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5 ${
          errors[id] ? "text-red-500" : "text-zinc-500"
        }`}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
