import { images } from "../constants";
import CustomButton from "../components/CustomButton";
import { Redirect, router } from "expo-router";
import { Image, SafeAreaView, ScrollView, Text, View } from "../api/elements";
import { useGlobalContext } from "../context/GlobalProvider";

export default function App() {
  const { isLoading, isLoggedIn } = useGlobalContext();
  if (!isLoading && isLoggedIn) return <Redirect href="/" />;
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="items-center justify-center w-full px-4 min-h-[85vh]">
          <Image
            source={images.logo}
            className="w-[130px] h-[84px] "
            resizeMode="contain"
          />
          <Image
            source={images.cards}
            className="max-w-[380px] h-[300px] w-full"
            resizeMode="contain"
          />

          <View className="relative mt-5">
            <Text className="text-3xl text-white font-bold text-center">
              Discover endless possibilities with{" "}
              <Text className="text-secondary-200">Aora</Text>
            </Text>
            <Image
              source={images.path}
              className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
              resizeMode="contain"
            />
          </View>
          <Text className="text-white text-sm font-pregular text-center mt-7">
            Explore the world of digital assets and discover the latest trends.
          </Text>
          <CustomButton
            title="Continue with email"
            onPress={() => {
              router.push("/sign-in");
            }}
            containerStyles="w-full mt-7"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
