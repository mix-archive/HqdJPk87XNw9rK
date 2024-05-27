import {
  json,
  redirect,
  type ActionFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
import { Welcome } from "~/components/Welcome/Welcome";
import { ColorSchemeToggle } from "~/components/ColorSchemeToggle/ColorSchemeToggle";
import { database } from "~/db";
import { useActionData } from "@remix-run/react";
import { Alert } from "@mantine/core";

export const meta: MetaFunction = () => {
  return [
    { title: "Mantine Remix App" },
    { name: "description", content: "Welcome to Mantine!" },
  ];
};

export async function action({ request }: ActionFunctionArgs) {
  const body = await request.formData();
  const email = body.get("email"),
    password = body.get("password");

  const result = database
    .prepare(
      `SELECT * FROM users WHERE email = '${email}' AND password = '${password}'`
    )
    .get();

  if (!result) {
    return json({
      status: 401,
      error: "Invalid email or password",
    });
  }

  return redirect("/dashboard");
}

export default function Index() {
  const actionData = useActionData<typeof action>();

  return (
    <div>
      {
        // If the user submitted the form and it was invalid, show an error message
        actionData?.error ? <Alert>{actionData.error}</Alert> : null
      }
      <Welcome />
      <ColorSchemeToggle />
    </div>
  );
}
