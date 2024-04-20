import { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, Text } from "../../api/elements";
import { getExercises } from "../../lib/appwrite";

export default function Bookmark() {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    getExercises().then((res) => {
      setExercises(res);
    });
  }, []);

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <Text className="text-2xl text-white font-psemibold">Bookmarks</Text>
        {/* <Text>Title: {notification?.request?.content.title} </Text> */}
        <Text className="text-white mt-4">Exercises:</Text>
        <Text className="text-white mt-4"> {JSON.stringify(exercises)} </Text>
        {/*  */}
      </ScrollView>
    </SafeAreaView>
  );
}
