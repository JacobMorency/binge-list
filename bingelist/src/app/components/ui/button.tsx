type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "accent" | "error" | "success";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
};

const baseStyles =
  "text-primary-content font-bold py-2 px-4 rounded shadow-md shadow-inner";

const variants = {
  primary: "bg-primary",
  secondary: "bg-secondary",
  accent: "bg-accent",
  error: "bg-error",
  success: "bg-success",
};

export default function Button({
  children,
  variant = "primary",
  className = "",
  onClick,
  disabled,
  type = "button",
}: ButtonProps) {
  const variantStyles = variants[variant] || variants.primary;
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles} ${className}`}
    >
      {children}
    </button>
  );
}
