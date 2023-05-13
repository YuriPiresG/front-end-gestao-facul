import { Button, Flex } from "@mantine/core";
import { Link } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import CreateCourse from "./CreateCourse";
import DeleteCourse from "./DeleteCourse";
import UpdateCourse from "./UpdateCourse";

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
        <CreateCourse /> 
        <Link to="/get-courses" className="link">
          <Button color="yellow"> Ver cursos existentes </Button>
        </Link> 
        <DeleteCourse /> 
        <UpdateCourse />
        </Flex>
      </div>
    </>
  );
}

export default DirectorScreen;
