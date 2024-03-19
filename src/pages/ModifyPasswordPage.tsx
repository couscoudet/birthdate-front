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
import { Link } from "react-router-dom";

const ForgotPasswordPage = () => {
  type FormData = {
    email: string;
  };

  const formSchema: ZodType<FormData> = z.object({
    email: z.string().email().min(4).max(200),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
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
          Mot de passe oublié
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
              <div className="flex justify-center">
                <Button
                  className="border-solid shadow-inner rounded-full shadow-fuchsia-200 py-2 px-8 mt-4"
                  type="submit"
                >
                  Envoyer un mail
                </Button>
              </div>
            </form>
          </Form>

          <Link to="/login">Se connecter</Link>
        </div>
      </MyLayout.Body>
      <MyLayout.Footer>Footer</MyLayout.Footer>
    </MyLayout>
  );
};

export default ForgotPasswordPage;
