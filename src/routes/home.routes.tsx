import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";
import Home from "@screens/Home";
import { Profile } from "@screens/Profile";
import { History } from "@screens/History";
import { Exercise } from "@screens/Exercise";
import { Icon, useTheme } from "native-base";
import { Platform } from "react-native";

import HomeSvg from "@assets/home.svg";
import ProfileSvg from "@assets/profile.svg";
import HistorySvg from "@assets/history.svg";

export type HomeRoutesParams = {
  Home: undefined;
  Profile: undefined;
  History: undefined;
  Exercise: { exerciseId: string }
};

interface NavigationTabProps {
  color: string;
}

const { Navigator, Screen, Group } =
  createBottomTabNavigator<HomeRoutesParams>();

export function HomeRoutes() {
  const { sizes, colors } = useTheme();

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.green[500],
        tabBarInactiveTintColor: colors.gray[200],
        tabBarStyle: {
          backgroundColor: colors.gray[800],
          borderTopWidth: 0,
          height: Platform.OS === "android" ? "auto" : sizes[16],
          paddingBottom: sizes[7],
          paddingTop: sizes[7],
        },
      }}
    >
      <Group>
        <Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({ color }: NavigationTabProps) => (
              <Icon
                as={<HomeSvg fill={color} height={sizes[8]} width={sizes[8]} />}
                name={""}
                color={color}
                size={sizes[2]}
              />
            ),
          }}
        />

        <Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({ color }: NavigationTabProps) => (
              <ProfileSvg fill={color} height={sizes[8]} width={sizes[8]} />
            ),
          }}
        />

        <Screen
          name="History"
          component={History}
          options={{
            tabBarIcon: ({ color }: NavigationTabProps) => (
              <HistorySvg fill={color} height={sizes[8]} width={sizes[8]} />
            ),
          }}
        />
      </Group>

      <Screen
        name="Exercise"
        component={Exercise}
        options={{
          tabBarButton: () => null,
        }}
      />
    </Navigator>
  );
}
