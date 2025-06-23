type InputProps = {
  placeholder?: string;
  type: string;
  className?: string;
};

export default function Input({ placeholder, className, type }: InputProps) {
  const baseStyles =
    "form-control p-2 rounded text-primary-content bg-base-300 border border-neutral-600 focus:border-primary focus:outline-none";

  return (
    <input
      type={type}
      className={`${baseStyles} ${className}`}
      placeholder={placeholder}
    />
  );
}
