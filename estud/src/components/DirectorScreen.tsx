import { Button, Flex, Image } from "@mantine/core";
import courseLogo from "../assets/courseLogo.png";
import { Link } from "react-router-dom";
import { useUser } from "../hooks/useUser";

function DirectorScreen() {
  const user = useUser();
  return (
    <>
      <div className="dashboard">
        <h1>Bem vindo ao seu dashboard, {user?.name} </h1>
        <Flex
          mih={50}
          gap="xs"
          justify="flex-start"
          align="flex-start"
          direction="column"
          wrap="wrap"
        >
          <Link to="/get-courses" className="link">
            <Button color="yellow"> Ver cursos existentes </Button>
          </Link>
          <Link to="/users/get" className="link">
            <Button color="yellow"> Ver usuários </Button>
          </Link>
        </Flex>
      </div>
      <Image
        src={courseLogo}
        style={{
          position: "absolute",
          bottom: "10px",
          right: "10px",
          maxWidth: "60vh",
          maxHeight: "50vh",
        }}
      />
    </>
  );
}

export default DirectorScreen;
