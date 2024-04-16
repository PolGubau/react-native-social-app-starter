import React from "react";
import { Tabs } from "expo-router";

const SearchLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{
          titiel: "Home",
          headerShown: false,
        }}
      />
    </Tabs>
  );
};

export default SearchLayout;
