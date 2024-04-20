import { useEffect, useState } from "react";
import { ListRenderItem } from "react-native";
import { FlatList, SafeAreaView, Text, View } from "../../api/elements";
import { VideoCard } from "../../components";
import { Routine, getRoutines } from "../../lib/appwrite";

export default function Bookmark() {
  const [routines, setRoutines] = useState<Routine[]>([]);

  useEffect(() => {
    getRoutines().then((res) => {
      if (!res) return console.error("No routines found");
      if (res) setRoutines(res);
    });
  }, []);
  const routineRenderer: ListRenderItem<Routine> = ({ item }) => (
    <VideoCard
      title={item.name}
      thumbnail={item.image}
      creator={item.creator.username}
      avatar={item.creator.image}
      id={item.id}
    />
  );

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        ListHeaderComponent={() => (
          <View className="flex my-6 px-4">
            <Text className="text-2xl font-psemibold text-white mt-1">
              Routines
            </Text>
          </View>
        )}
        data={routines}
        keyExtractor={(item: Routine) => item.id.toString()}
        renderItem={routineRenderer}
      />
    </SafeAreaView>
  );
}
