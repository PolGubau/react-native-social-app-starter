import React from "react";
import { FlatList, SafeAreaView, Text } from "../../api/elements";

const Home = () => {
  return (
    <SafeAreaView>
      <FlatList
        data={[1, 2, 3, 4, 5]}
        keyExtractor={(item) => item.toString()}
        renderItem={({ item }) => {
          return <Text>{item}</Text>;
        }}
      >
        Home
      </FlatList>
    </SafeAreaView>
  );
};

export default Home;
