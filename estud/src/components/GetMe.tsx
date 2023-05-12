import { useQuery } from "@tanstack/react-query";
import { User } from "../hooks/useUser";
import { api } from "../lib/api";
import { Avatar, Card, Divider, List, Text } from "@mantine/core";

const useMe = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const response = await api.get<User>("/users/me");
      return response.data;
    },
  });
};

function GetMe() {
  const { data: me, isLoading } = useMe();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  let roleString;
  if (me?.role === 0) {
    roleString = "ADMIN";
  } else if (me?.role === 1) {
    roleString = "Director";
  } else {
    roleString = "Coordinator";
  }

  return (
    <Card shadow="sm">
      <div style={{ display: "flex", alignItems: "center", marginBottom: 20 }}>
        <Avatar src={null} alt={me?.name} size="lg" />
        <Text style={{ marginLeft: 20 }} size="lg">
          {me?.name}
        </Text>
      </div>
      <Divider />
      <List>
        <List.Item>
          <Text weight={500}>Name:</Text>{" "}
          <Text style={{ marginLeft: 5 }}>{me?.name}</Text>
        </List.Item>
        <List.Item>
          <Text weight={500}>Role:</Text>{" "}
          <Text style={{ marginLeft: 5 }}>
            {roleString}
          </Text>
        </List.Item>
      </List>
    </Card>
  );
}

export default GetMe;
