import { z } from "zod";

const LoginSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email format!" })
    .min(1, { message: "Email is required!" }),
  password: z
    .string()
    .min(1, { message: "Password is required!" }),
});

export type LoginSchemaTypes = {
  email?: string;
  password?: string;
  errors?: {
    email?: string[];
    password?: string[];
  };
};

export async function handleForm(
  _prevState: LoginSchemaTypes,
  formData: FormData,
  login: any,
  setLogin: (state: boolean) => void,
  toast:any
) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const validatedFields = LoginSchema.safeParse({
    email,
    password,
  });

  if (!validatedFields.success) {
    return {
      email,
      password,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const result = login(email, password);
  console.log(result)
  if (result.success) {
    return {
      email,
      password,
      errors: {
        email: ["Success"],
      },
    };
    // toast("Login successfull", {
    //   description: "Welcome to the Dashboard",
    //   style: {
    //     background: "#0a0a0a",
    //     border: "1px solid #27272a",
    //     color:"#ffffff"
    //   },
    // });
    //     redirect(`dashboard/${result.id}`);

  }else{
    // toast("Error occurred", {
    //   description: result.message,
    //   style: {
    //     background: "#0a0a0a",
    //     border: "1px solid #27272a",
    //     color: "#ffffff",
    //   },
    // });
    return {
      email,
      password,
      errors: {
        email: ["Not-Success"],
      },
    };
  }
  return {
    email,
    password,
    errors: {
      email: ["Success"],
    },
  };
}
