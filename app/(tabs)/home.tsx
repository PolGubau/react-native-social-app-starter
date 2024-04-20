import { useState } from "react";

import { images } from "../../constants";
import useAppwrite from "../../lib/useAppwrite";
import { getAllPosts, getLatestPosts, modifyUser } from "../../lib/appwrite";
import {
  CustomButton,
  EmptyState,
  SearchInput,
  Trending,
  VideoCard,
} from "../../components";

import { FlatList, Image, SafeAreaView, Text, View } from "../../api/elements";
import { Post } from "../../types/post";
import { Alert, ListRenderItem, RefreshControl } from "react-native";
import { useGlobalContext } from "../../context/GlobalProvider";
import { Redirect } from "expo-router";
import { Authenthicator } from "../../lib/authenticator";
export const renderItem: ListRenderItem<Post> = ({ item }) => (
  <VideoCard
    id={item.$id}
    title={item.title}
    thumbnail={item.thumbnail}
    creator={item.creator.username}
    avatar={item.creator.avatar}
  />
);
const Home = () => {
  const { data: posts, refetch } = useAppwrite({ fn: getAllPosts });
  const { data: latestPosts } = useAppwrite({ fn: getLatestPosts });

  const [refreshing, setRefreshing] = useState(false);
  const { user, setUser } = useGlobalContext();
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  // one flatlist
  // with list header
  // and horizontal flatlist

  //  we cannot do that with just scrollview as there's both horizontal and vertical scroll (two flat lists, within trending)

  if (!user?.$id) return <Redirect href="/sign-in" />;
  const handleEnableBiometrics = async () => {
    const isAble = await Authenthicator.unlock();
    if (isAble) {
      const updatedUser = await modifyUser(user.$id, {
        biometric_enabled: true,
      });
      if (!updatedUser) {
        Alert.alert("Error", "Failed to enable biometrics");
        return;
      }
      setUser(updatedUser);
      Alert.alert("Success", "Biometrics enabled successfully");
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item: Post) => item.$id}
        renderItem={renderItem}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 flex ">
            <View className="flex justify-between items-start flex-row mb-6 gap-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome Back
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  {user.username ?? "User"}
                </Text>
              </View>

              <View className="mt-1.5">
                <Image
                  src={user.avatar}
                  className="w-9 h-10"
                  resizeMode="contain"
                />
              </View>
            </View>

            {!user.biometric_enabled && (
              <CustomButton
                containerStyles="bg-gray-300 mb-4"
                onPress={handleEnableBiometrics}
              >
                Enable Biometrics
              </CustomButton>
            )}

            <SearchInput />

            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-lg font-pregular text-gray-100 mb-3">
                Latest Videos
              </Text>

              <Trending posts={latestPosts ?? []} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos created yet"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Home;
