type InputProps = {
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function Input({ className, ...props }: InputProps) {
  const baseStyles =
    "form-control p-2 rounded text-primary-content bg-base-300 border border-neutral-600 focus:border-primary focus:outline-none";

  return <input className={`${baseStyles} ${className}`} {...props} />;
}
