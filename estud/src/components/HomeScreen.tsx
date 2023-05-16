import { UserRole } from "../constants/role";
import { useUser } from "../hooks/useUser";
import AdminScreen from "./AdminScreen";
import CoordinatorScreen from "./CoordinatorScreen";
import DirectorScreen from "./DirectorScreen";

function HomeScreen() {
  const user = useUser();
  const role = user?.role ?? 99;
  return (
    <div>
      {role <= UserRole.ADMIN ? (
        <AdminScreen />
      ) : role <= UserRole.DIRECTOR ? (
        <DirectorScreen />
      ) : (
        <CoordinatorScreen />
      )}
    </div>
  );
}

export default HomeScreen;
