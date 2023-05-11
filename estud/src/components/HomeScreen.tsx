import React from "react";
import CoordinatorScreen from "./CoordinatorScreen";
import DirectorScreen from "./DirectorScreen";
import { useUser } from "../hooks/useUser";
import { UserRole } from "../constants/role";

function HomeScreen() {
  const user = useUser();
  const role = user?.role ?? 99;
  return (
    <div>
      {role <= UserRole.DIRECTOR ? (
        <DirectorScreen />
      ) : (
        <CoordinatorScreen />
      )}
    </div>
  );
}

export default HomeScreen;
