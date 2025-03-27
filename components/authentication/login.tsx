import { handleForm, LoginSchemaTypes } from "@/actions/login-action";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthContext } from "@/context/auth-context";
import { useActionState, useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { Loader } from "lucide-react";

export function LoginForm({
  setLogin,
}: {
  setLogin: (state: boolean) => void;
}) {
  const [loading, setLoading] = useState(false);
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("Auth Context not found");
  }
  const { login, user } = authContext;
  const router = useRouter();
  const [state, formAction] = useActionState(
    async (prevState: LoginSchemaTypes, formData: FormData) => {
      return await handleForm(prevState, formData, login, setLogin, toast);
    },
    {
      email: "",
      password: "",
      errors: {
        email: [],
        password: [],
      },
    }
  );

  useEffect(() => {
    if (user && user.id) {
      setLoading(true);
      router.push(`/dashboard/${user.id}`);
    }
  }, [user]);

  return (
    <div className="flex flex-col gap-6">
      <Card className="bg-neutral-950 text-zinc-200 border-1 border-zinc-800">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>Login with your Google account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="flex flex-col gap-4">
              <Button
                variant="outline"
                className="w-full bg-neutral-900 hover:bg-neutral-800 hover:text-zinc-100 border-1 border-zinc-800"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                    fill="currentColor"
                  />
                </svg>
                Login with Google
              </Button>
            </div>
            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
              <span className="relative z-10 bg-neutral-800 py-1 px-2 rounded text-zinc-400 ">
                Or continue with
              </span>
            </div>
            <form action={formAction} className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <div>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    defaultValue={state?.email}
                    placeholder="m@example.com"
                    className="border-1 border-zinc-800"
                  />
                </div>
                {state.errors?.email &&
                  state.errors.email[0] !== "Success" &&
                  state.errors.email[0] !== "Not-Success" && (
                    <p className="text-xs text-red-400">
                      {state.errors.email[0]}
                    </p>
                  )}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <div>
                  <Input
                    id="password"
                    type="password"
                    name="password"
                    defaultValue={state?.password}
                    placeholder="********"
                    className="flex items-center border-1 border-zinc-800"
                  />
                  {state.errors?.password && (
                    <p className="text-xs text-red-400">
                      {state.errors.password[0]}
                    </p>
                  )}
                </div>
              </div>
              <Button
                type="submit"
                className={`w-full border-1 hover:bg-neutral-800 border-zinc-800 cursor-pointer`}
              >
                {loading ? (
                  <div className="'animate-spin">
                    {" "}
                    <Loader className="animate-spin" />
                  </div>
                ) : (
                  "Login"
                )}
              </Button>
            </form>
            <div className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <span
                onClick={() => setLogin(false)}
                className="cursor-pointer underline underline-offset-4"
              >
                Sign up
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
        By clicking continue, you agree to our Terms of Service and Privacy
        Policy.
      </div>
    </div>
  );
}
