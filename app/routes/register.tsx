import { Alert } from "@mantine/core";
import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import { ColorSchemeToggle } from "~/components/ColorSchemeToggle/ColorSchemeToggle";
import { RegisterForm } from "~/components/Register/Register";
import { database } from "~/db";

export async function action({ request }: ActionFunctionArgs) {
  const body = await request.formData();

  const email = body.get("email"),
    password = body.get("password");

  // Check if the user already exists
  const result = database
    .prepare("SELECT * FROM users WHERE email = ?")
    .get(email);

  if (result) {
    return json({
      status: 409,
      error: "User already exists",
    });
  }

  // Insert the user into the database
  database
    .prepare("INSERT INTO users (email, password) VALUES (?, ?)")
    .run(email, password);

  return redirect("/");
}

export default function RegisterPage() {
  const actionData = useActionData<typeof action>();
  return (
    <div>
      {actionData?.error ? <Alert>{actionData.error}</Alert> : null}
      <RegisterForm />
      <ColorSchemeToggle />
    </div>
  );
}
