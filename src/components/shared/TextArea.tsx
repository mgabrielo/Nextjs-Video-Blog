"use client";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
interface ITextArea {
  id: string;
  label: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  changeValue: (id: string, value: string) => void;
}

const TextArea = ({
  id,
  label,
  disabled,
  required,
  register,
  errors,
  changeValue,
}: ITextArea) => {
  return (
    <div className="relative">
      <div
        contentEditable={true}
        onInput={(e) => changeValue?.(id, e.currentTarget.innerText || "")}
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        className={`peer disabled:opacity-70 disabled:cursor-not-allowed w-full px-4 pb-2 pt-8 min-h-[100px] rounded-md outline-none border-[1px] bg-stone-900 ${
          errors[id]
            ? "border-red-500 focus:border-red-500"
            : "border-zinc-500 focus:border-blue-500"
        }`}
      />
      <label
        htmlFor={id}
        className={`absolute bg-stone-900 px-1 top-2 left-2 z-[1] ${
          errors[id] ? "text-red-500" : "text-zinc-500"
        }`}
      >
        {label}
      </label>
    </div>
  );
};

export default TextArea;
