import { AppShell, Avatar, Button, Flex, Header, Navbar } from "@mantine/core";
import { Link, Outlet } from "react-router-dom";
import { useHome } from "../hooks/useHome";
import { useLogout } from "../hooks/useLogout";
import { useUser } from "../hooks/useUser";

export const Layout = () => {
  const user = useUser();
  const logout = useLogout();
  const home = useHome();
  let userRole = "DEFAULT";
  if (user?.role === 0) {
    userRole = "ADMIN";
  }
  if (user?.role === 1) {
    userRole = "DIRECTOR";
  }
  if (user?.role === 2) {
    userRole = "COORDINATOR";
  }

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
            <Navbar.Section>
              <Flex
                mih={50}
                gap="xs"
                justify="flex-start"
                align="flex-start"
                direction="column"
                wrap="wrap"
              >
                <Link to="/users/get" className="link">
                  <Button color="yellow">Ver usuários</Button>
                </Link>

                <Link to="/get-courses" className="link">
                  <Button color="yellow"> Ver cursos existentes </Button>
                </Link>

                {(userRole === "COORDINATOR" || userRole === "ADMIN") && (
                  <Link to="/calendars/get" className="link">
                    <Button color="yellow"> Ver calendários </Button>
                  </Link>
                )}
                {(userRole === "COORDINATOR" || userRole === "ADMIN") && (
                  <Link to="/professors/get" className="link">
                    <Button color="yellow"> Ver professores </Button>
                  </Link>
                )}
                <Button
                  onClick={handleLogout}
                  color="red"
                  style={{ marginTop: "55vh" }}
                >
                  Sair do sistema
                </Button>
                <Button
                  onClick={handleHome}
                  color="blue"
                  style={{ marginTop: "auto", marginBottom: "auto" }}
                >
                  Voltar para o início
                </Button>
              </Flex>
            </Navbar.Section>
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
