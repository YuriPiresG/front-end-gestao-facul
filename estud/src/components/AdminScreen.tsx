import { Flex, Image } from "@mantine/core";
import courseLogo from "../assets/courseLogo.png";
import { useUser } from "../hooks/useUser";

function AdminScreen() {
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
        </Flex>
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
      </div>
    </>
  );
}

export default AdminScreen;
