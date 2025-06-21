import LoginForm from "@/app/components/login/loginform";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-primary-content text-3xl mb-12">Log In</h1>
      <LoginForm />
    </div>
  );
}
