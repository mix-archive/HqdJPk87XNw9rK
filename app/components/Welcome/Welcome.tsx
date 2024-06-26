import {
  Title,
  Text,
  Card,
  Input,
  Button,
  ActionIcon,
  Anchor,
} from "@mantine/core";
import classes from "./Welcome.module.css";
import { Form } from "@remix-run/react";
import { IconAt, IconEye, IconEyeOff, IconPassword } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";

export function Welcome() {
  const [passwordHidden, { toggle: togglePasswordHidden }] =
    useDisclosure(true);

  return (
    <>
      <Title className={classes.title} ta="center" mt={100}>
        Welcome to{" "}
        <Text
          inherit
          variant="gradient"
          component="span"
          gradient={{ from: "pink", to: "yellow" }}
        >
          My Login
        </Text>
      </Title>
      <Card shadow="xs" className={classes.card} mt="xl" mx="auto" maw={400}>
        <Text size="xl" ta="center">
          Login
        </Text>
        <Text c="dimmed" size="sm" ta="center" mt="sm">
          Welcome back! Please login to your account.
          <br />
          {"Don't have an account?"}
          <Anchor href="/register" ml="xs">
            Register
          </Anchor>
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
              required
              name="email"
              leftSection={<IconAt size={18} />}
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
