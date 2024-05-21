import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import MyLayout from "@/layouts/MyLayout";
import { z, ZodType } from "zod";
import { Button } from "@/components/ui/button";
import { Link, Navigate } from "react-router-dom";
import { useApi } from "@/hooks/useApi";
import { useState } from "react";

const SignupPage = () => {
  const api = useApi();

  const regexPassword =
    /^(?=.*[a-zàâäçéèêëîïôœùûü])(?=.*[A-ZÀÂÄÇÉÈÊËÎÏÔŒÙÛÜ])(?=.*\d)(?=.*[@$!%*?&çàâäéèêëîïôœùûü])([a-zA-ZÀÂÄÇÉÈÊËÎÏÔŒÙÛÜ\d@$!%*?&çàâäéèêëîïôœùûü]{8,})$/;

  type FormData = {
    email: string;
    password: string;
    passwordConfirm: string;
  };

  const formSchema: ZodType<FormData> = z.object({
    email: z.string().email().min(4).max(200),
    password: z.string().regex(regexPassword).max(30),
    passwordConfirm: z.string(),
  });
  // .refine(
  //   (data) => {
  //     data.password === data.passwordConfirm;
  //   },
  //   {
  //     path: ["confirmPassword"],
  //     message: "Les passwords ne correspondent pas",
  //   }
  // );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    axios
      .post(`${import.meta.env.VITE_ENV_BASE_URL}/signup`, { user: values })
      .then((result) => {
        if (result.request.status === 200) {
          setSignUpConfirmed(1);
        }
      })
      .catch(() => {
        setSignUpConfirmed(2);
      });
  }

  const [signupConfirmed, setSignUpConfirmed] = useState(0);

  return (
    <MyLayout>
      {signupConfirmed === 1 && (
        <Navigate to="/signup-confirmation" replace={true} />
      )}
      {signupConfirmed === 2 && <Navigate to="/error-page" replace={true} />}
      <MyLayout.Header>
        <div className="h-full flex justify-center items-center text-3xl">
          Inscription
        </div>
      </MyLayout.Header>
      <MyLayout.Body>
        <div className="flex flex-col items-center h-full justify-evenly">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 w-60"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>email</FormLabel>
                    <FormControl>
                      <Input
                        className="text-black autofill:shadow-[inset_0_0_0px_1000px_rgb(240,240,240)]"
                        placeholder="mail@domaine.fr"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>mot de passe</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        className="text-black autofill:shadow-[inset_0_0_0px_1000px_rgb(240,240,240)]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="passwordConfirm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmer mot de passe</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        className="text-black autofill:shadow-[inset_0_0_0px_1000px_rgb(240,240,240)]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-center">
                <Button
                  className="border-solid shadow-inner rounded-full shadow-fuchsia-200 py-2 px-8 mt-4"
                  type="submit"
                >
                  S'insrire
                </Button>
              </div>
            </form>
          </Form>
          <div className="flex flex-col items-center">
            <p className="text-xs">Déja inscrit ? </p>
            <Link to="/login">Se connecter</Link>
          </div>
        </div>
      </MyLayout.Body>
      <MyLayout.Footer>Footer</MyLayout.Footer>
    </MyLayout>
  );
};

export default SignupPage;
