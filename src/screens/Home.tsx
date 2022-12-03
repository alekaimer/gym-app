import React from "react";
import { FlatList, HStack } from "native-base";
import WithHeaderTemplate from "@templates/WithHeaderTemplate";
import { Group } from "@components/Group";

function Home() {
  const [groups, setGroups] = React.useState([
    "Costas",
    "Bíceps",
    "Tríceps",
    "Ombro",
  ]);
  const [activeGroup, setActiveGroup] = React.useState("costas");

  return (
    <WithHeaderTemplate>
      <FlatList
        data={groups}
        renderItem={({ item }) => (
          <Group
            name={item}
            isActive={activeGroup.toLowerCase() === item.toLowerCase()}
            onPress={() => setActiveGroup(item)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        // p={4}
        _contentContainerStyle={{
          px: 8,
        }}
        my={10}
        maxH={10}
      />
    </WithHeaderTemplate>
  );
}

export default Home;
