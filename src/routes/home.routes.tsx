import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";
import Home from "@screens/Home";
import { Perfil } from "@screens/Perfil";
import { Menu } from "@screens/Menu";
import { Icon } from "native-base";
import { ComponentsExibition } from "@screens/ComponentsExibition";

export type BottomTabParams = {
  Home: undefined;
  Perfil: undefined;
  Menu: undefined;
  ComponentsExibition: undefined;
};

interface NavigationTabProps {
  color: string;
}

const { Navigator, Screen, Group } =
  createBottomTabNavigator<BottomTabParams>();

export function HomeRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "red",
        tabBarInactiveTintColor: "blue",
        tabBarShowLabel: false,
      }}
    >
      <Group>
        <Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({ color }: NavigationTabProps) => (
              <Icon
                as={MaterialIcons}
                name={"home"}
                color={color}
                size={"xl"}
              />
            ),
          }}
        />

        <Screen
          name="Perfil"
          component={Perfil}
          options={{
            tabBarIcon: ({ color }: NavigationTabProps) => (
              <Icon
                as={MaterialIcons}
                name={"person"}
                color={color}
                size={"xl"}
              />
            ),
          }}
        />

        <Screen
          name="Menu"
          component={Menu}
          options={{
            tabBarIcon: ({ color }: NavigationTabProps) => (
              <Icon
                as={MaterialIcons}
                name={"menu"}
                color={color}
                size={"xl"}
              />
            ),
          }}
        />
        
        <Screen
        name="ComponentsExibition"
        component={ComponentsExibition}
        options={{
          tabBarIcon: ({ color }: NavigationTabProps) => (
            <Icon
              as={MaterialIcons}
              name={"settings-input-component"}
              color={color}
              size={"xl"}
            />
          ),
        }}
      />
      </Group>
    </Navigator>
  );
}
