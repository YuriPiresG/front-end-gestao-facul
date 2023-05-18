import { AppShell, Avatar, Button, Header, Navbar } from "@mantine/core";
import { Link, Outlet } from "react-router-dom";
import { useHome } from "../hooks/useHome";
import { useLogout } from "../hooks/useLogout";
import { useUser } from "../hooks/useUser";

export const Layout = () => {
  const user = useUser();
  const logout = useLogout();
  const home = useHome();

  const handleLogout = () => {
    logout();
  };
  const handleHome = () => {
    home();
  };
  return (
    <div>
      <AppShell
        styles={(theme) => ({
          main: {
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
          },
        })}
        padding="md"
        navbar={
          <Navbar width={{ base: 300 }} height={"100vh"} p="xs">
            <Navbar.Section>USUARIO</Navbar.Section>
            <Button onClick={handleLogout} color="red" style={{ top: "85vh" }}>
              Sair do sistema
            </Button>
            <Button onClick={handleHome} color="blue" style={{ top: "75vh" }}>
              Voltar para o início
            </Button>
          </Navbar>
        }
        header={
          <Header
            height={60}
            p="xs"
            style={{ display: "flex", alignItems: "center" }}
          >
            <span> Olá, {user?.name}</span>
            <Link
              to="/users/me"
              className="link"
              style={{ marginLeft: "auto", display: "flex" }}
            >
              <Avatar src={null} alt="Usuário" size={50} color="indigo" />
            </Link>
          </Header>
        }
      >
        <Outlet />
      </AppShell>
    </div>
  );
};
