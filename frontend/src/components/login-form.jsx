import { cn } from "cn";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import GoogleButtonLogin from "./Button";
import { useState } from "react";
import { useAuth } from "@/auth/AuthContext";

const emptyForm = { email: "", password: "", username: "", fullname: "" };
const loginForm = { username: "", password: "" };

export function LoginForm({ className, ...props }) {
  const { loginwithEmail, registerWithEmail } = useAuth();
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);

  const isRegister = mode === "register";

  function handleChange(event) {
    setForm({ ...form, [event.target.id]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);

    if (isRegister) {
      await registerWithEmail(form);
    } else {
      await loginwithEmail({
        username: form.username,
        password: form.password,
      });
    }
    setSubmitting(false);
  }
  function toggle(event) {
    event.preventDefault();
    setMode(isRegister ? "login" : "register");
    setForm(loginForm);
  }

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      {...props}
      onSubmit={handleSubmit}
    >
      
      <FieldGroup>
        {!isRegister && (
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Enter your email below to login to your account
          </p>
        </div>
        )}
        {isRegister && (
          <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Time to create your account!</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Enter your details to create a new account
          </p>
        </div>
        )}
        {isRegister && (

        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            value={form.email}
            placeholder="m@example.com"
            required
            onChange={handleChange}
          />
        </Field>
                )}

        <Field>
          <FieldLabel htmlFor="username">User name</FieldLabel>
          <Input
            id="username"
            type="text"
            value={form.username}
            placeholder="example"
            required
            onChange={handleChange}
          />
        </Field>
{isRegister &&( 
        <Field>
          <FieldLabel htmlFor="fullname">Full Name</FieldLabel>
          <Input
            id="fullname"
            type="text"
            value={form.fullname}
            placeholder="example example"
            required
            onChange={handleChange}
          />
        </Field>
        )}
        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Password </FieldLabel>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <Input
            id="password"
            onChange={handleChange}
            value={form.password}
            type="password"
            required
          />
        </Field>
        <Field>
          <Button type="submit" disabled={submitting}>
            {isRegister ? "sign up" : "Login"}{" "}
          </Button>
        </Field>
        <FieldSeparator>Or continue with</FieldSeparator>
        <Field>
          <GoogleButtonLogin />
          <FieldDescription className="text-center">
            {isRegister
              ? "Don't have an account yet?"
              : "Already have an account?"}
            <a
              href="#"
              onClick={toggle}
              className="underline underline-offset-4"
            >
              {isRegister ? "sign up" : "Login"}
            </a>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
