import { AppShell, Header, Navbar, Avatar, Button } from "@mantine/core";
import { Outlet, Link } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import { useLogout } from "../hooks/useLogout";

export const Layout = () => {
  const user = useUser();
  const logout = useLogout();

  const handleLogout = () => {
    logout();
  };
  return (
    <div>
      <AppShell
        padding="md"
        navbar={
          <Navbar width={{ base: 300 }} height={"100vh"} p="xs">
            <Navbar.Section>USUARIO</Navbar.Section>
            <Button onClick={handleLogout} style={{top:"85vh"}}>Sair do sistema</Button>
          </Navbar>
        }
        header={
          <Header height={60} p="xs">
            Olá, {user?.name}
            <Link to="/users/me" className="link">
              <Avatar
                src={null}
                alt="Usuário"
                size={50}
                style={{ left: "192vh", bottom: "3vh" }}
                color="indigo"
              />
            </Link>
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
