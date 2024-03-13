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
import { Link } from "react-router-dom";

const LoginPage = () => {
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
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <MyLayout>
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
                        className="text-violet-900"
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
                        className="text-violet-900"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-center">
                <Button
                  className="border-solid shadow-inner rounded-full shadow-fuchsia-200 py-2 px-8 mt-8"
                  type="submit"
                >
                  Valider
                </Button>
              </div>
            </form>
          </Form>
          <Link to="/signup">Pas encore inscrit ?</Link>
        </div>
      </MyLayout.Body>
      <MyLayout.Footer>Footer</MyLayout.Footer>
    </MyLayout>
  );
};

export default LoginPage;
