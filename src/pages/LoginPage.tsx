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
import z from "zod";
import { Button } from "@/components/ui/button";
import { Link, Navigate } from "react-router-dom";
import { useApi } from "@/hooks/useApi";
import { useState } from "react";

const LoginPage = () => {
  const api = useApi();
  const [isLoggedIn, setIsLoggedIn] = useState(0);
  const regexPassword =
    /^(?=.*[a-zàâäçéèêëîïôœùûü])(?=.*[A-ZÀÂÄÇÉÈÊËÎÏÔŒÙÛÜ])(?=.*\d)(?=.*[@$!%*?&çàâäéèêëîïôœùûü])([a-zA-ZÀÂÄÇÉÈÊËÎÏÔŒÙÛÜ\d@$!%*?&çàâäéèêëîïôœùûü]{8,})$/;
  const formSchema = z.object({
    email: z.string().email().min(4).max(200),
    password: z.string().regex(regexPassword).max(30),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    api.post("/login", { user: values }).then((result) => {
      if (result.request.status === 200 && result.data.user) {
        localStorage.setItem("user", result.data.user);
        localStorage.setItem("token", result.data.token);
        localStorage.setItem("refreshToken", result.data.refreshToken);
        setIsLoggedIn(1);
        return;
      } else {
        setIsLoggedIn(2);
        return <Navigate to="/error-page" replace={true} />;
      }
    });
  }

  return (
    <MyLayout>
      {(localStorage.getItem("user") || isLoggedIn === 1) && (
        <Navigate to="/" replace={true} />
      )}
      {isLoggedIn === 2 && <Navigate to="/error-page" replace={true} />}
      <MyLayout.Header>
        <div className="h-full flex justify-center items-center text-3xl">
          Connexion
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
              <div className="flex justify-center">
                <Button
                  className="border-solid shadow-inner rounded-full shadow-fuchsia-200 py-2 px-8 mt-4"
                  type="submit"
                >
                  Valider
                </Button>
              </div>
            </form>
          </Form>
          <Link to="/signup">Pas encore inscrit ?</Link>
          <Link to="/forgot-password" className="mt-1">
            Mot de passe oublié
          </Link>
        </div>
      </MyLayout.Body>
      <MyLayout.Footer>Footer</MyLayout.Footer>
    </MyLayout>
  );
};

export default LoginPage;
