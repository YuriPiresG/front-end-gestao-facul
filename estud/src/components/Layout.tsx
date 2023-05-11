import { AppShell, Header, Navbar } from "@mantine/core";
import { Outlet } from "react-router-dom";
import { useUser } from "../hooks/useUser";

export const Layout = () => {
  const user = useUser();
  return (
    <div>
      <AppShell
        padding="md"
        navbar={
          <Navbar width={{ base: 300 }} height={"100vh"} p="xs">
            {/* Navbar content */}
          </Navbar>
        }
        header={
          <Header height={60} p="xs">
            Olá, {user?.name}
          </Header>
        }
        styles={(theme) => ({
          main: {
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
          },
        })}
      >
        <Outlet />
      </AppShell>
    </div>
  );
};
