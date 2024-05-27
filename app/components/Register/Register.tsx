import { Title, Text, Card, Input, Button, ActionIcon } from "@mantine/core";
import { Form } from "@remix-run/react";
import { IconAt, IconEye, IconEyeOff, IconPassword } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";

export function RegisterForm() {
  const [passwordHidden, { toggle: togglePasswordHidden }] =
    useDisclosure(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <>
      <Title ta="center" mt={100}>
        <Text
          inherit
          variant="gradient"
          component="span"
          gradient={{ from: "blue", to: "purple" }}
        >
          Register Here
        </Text>
      </Title>
      <Card shadow="xs" mt="xl" mx="auto" maw={400}>
        <Text size="xl" ta="center">
          Register
        </Text>
        <Text c="dimmed" size="sm" ta="center" mt="sm">
          {"Register for an account. It's free!"}
        </Text>

        <Form method="post">
          <Input.Wrapper
            pt="sm"
            label="Email"
            withAsterisk
            description="Your email address"
          >
            <Input
              placeholder="alan.turing@gchq.gov.uk"
              error={email.match(/@/) ? null : "Invalid email"}
              required
              name="email"
              leftSection={<IconAt size={18} />}
              onChange={(event) => setEmail(event.currentTarget.value)}
            />
          </Input.Wrapper>
          <Input.Wrapper
            pt="sm"
            label="Password"
            withAsterisk
            description="Your password"
          >
            <Input
              placeholder="alan19120123turing"
              type={passwordHidden ? "password" : "text"}
              name="password"
              required
              leftSection={<IconPassword size={18} />}
              rightSectionPointerEvents="all"
              rightSection={
                <ActionIcon
                  variant="transparent"
                  onClick={togglePasswordHidden}
                >
                  {passwordHidden ? (
                    <IconEyeOff size={18} />
                  ) : (
                    <IconEye size={18} />
                  )}
                </ActionIcon>
              }
              onChange={(event) => setPassword(event.currentTarget.value)}
            />
          </Input.Wrapper>
          <Input.Wrapper
            pt="sm"
            label="Confirm Password"
            withAsterisk
            description="Your password again"
          >
            <Input
              placeholder="alan19120123turing"
              type={passwordHidden ? "password" : "text"}
              name="password"
              required
              leftSection={<IconPassword size={18} />}
              error={
                password !== confirmPassword ? "Passwords do not match" : null
              }
              rightSectionPointerEvents="all"
              rightSection={
                <ActionIcon
                  variant="transparent"
                  onClick={togglePasswordHidden}
                >
                  {passwordHidden ? (
                    <IconEyeOff size={18} />
                  ) : (
                    <IconEye size={18} />
                  )}
                </ActionIcon>
              }
              onChange={(event) =>
                setConfirmPassword(event.currentTarget.value)
              }
            />
          </Input.Wrapper>
          <Button type="submit" variant="gradient" fullWidth mt="md">
            <Text size="xl">Login</Text>
          </Button>
        </Form>
      </Card>
    </>
  );
}
