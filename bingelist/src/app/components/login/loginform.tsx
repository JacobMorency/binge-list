import Button from "@/app/components/ui/button";

export default function LoginForm() {
  return (
    <div className="w-full p-4">
      <form action="">
        <div className="form-group flex flex-col mb-4">
          <label htmlFor="email" className="text-primary-content">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            className="form-control border border-primary p-2 rounded"
            required
          />
        </div>
        <div className="form-group flex flex-col mb-4">
          <label htmlFor="password" className="text-primary-content">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            className="form-control border border-primary p-2 rounded"
            required
          />
          <a href="#" className="text-primary text-sm mt-2">
            Forgot password?
          </a>
        </div>
        <Button>Login</Button>
      </form>
    </div>
  );
}
