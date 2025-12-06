import { Drawer } from "expo-router/drawer";

export default function Layout() {
  return (
    <Drawer
      screenOptions={{
        headerStyle: {
          backgroundColor: "#021123",
        },
        headerTintColor: "#FFF",
        drawerStyle: {
          backgroundColor: "#021123",
        },
        drawerLabelStyle: {
          color: "#FFF",
        },
      }}
    >
      <Drawer.Screen
        name="index"
        options={{
          headerShown: false,
          drawerItemStyle: { display: "none" },
        }}
      />

      <Drawer.Screen
        name="pomodoro"
        options={{
          drawerLabel: "Timer",
          title: "",
        }}
      />

      <Drawer.Screen
        name="viacep"
        options={{
          drawerLabel: "Meu CEP",
          title: "",
        }}
      />

      <Drawer.Screen
        name="add-task"
        options={{
          drawerLabel: "Minhas tarefas",
          title: ""
        }}
      />
    </Drawer>
  );
}
