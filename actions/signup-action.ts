import { toast } from "sonner";
import { z } from "zod";

const SignupSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }).trim(),
  email: z
    .string()
    .email({ message: "Invalid email format" })
    .min(1, { message: "Email is required" }),
  password: z
    .string()
    .min(8, { message: "Password must be atleast 8 characters long" }),
});

export type SignupSchemaTypes = {
  name?: string;
  email?: string;
  password?: string;
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
  };
};

export async function handleForm(
  _prevState: SignupSchemaTypes,
  formData: FormData,
  signUp: any,
  setLogin: (state: boolean) => void
) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const validatedFields = SignupSchema.safeParse({
    name,
    email,
    password,
  });

  if (!validatedFields.success) {
    return {
      name,
      email,
      password,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const result = signUp(email, password, name);
  if (result.success) {
    setLogin(true);
    toast("Sign-up successfull", {
      description: "Login into your account",
      style: {
        background: "#0a0a0a",
        border: "1px solid #27272a",
        color: "#ffffff",
      },
    });

        return { name: "", email: "", password: "", errors: {} };
  } else {
    toast("Error occurred", {
      description: result.message,
      style: {
        background: "#0a0a0a",
        border: "1px solid #27272a",
        color: "#ffffff",
      },
    });
  }

  return {
    name,
    email,
    password,
    errors: {
      name: ["Success"],
    },
  };
}
