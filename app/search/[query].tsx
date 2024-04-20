import { useLocalSearchParams } from "expo-router";

import useAppwrite from "../../lib/useAppwrite";
import { searchPosts } from "../../lib/appwrite";
import { EmptyState, SearchInput } from "../../components";
import { FlatList, SafeAreaView, Text, View } from "../../api/elements";
import { renderItem } from "../(tabs)/home";
import { Post } from "../../types/post";

const Search = () => {
  const { query } = useLocalSearchParams();
  const { data: posts, refetch } = useAppwrite({
    fn: () => searchPosts(query),
  });

  const initialQuery = query as string;
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        onRefresh={refetch}
        data={posts}
        keyExtractor={(item: Post) => item.$id}
        renderItem={renderItem}
        ListHeaderComponent={() => (
          <View className="flex my-6 px-4">
            <Text className="font-pmedium text-gray-100 text-sm">
              Search Results
            </Text>
            <Text className="text-2xl font-psemibold text-white mt-1">
              {query}
            </Text>

            <View className="mt-6 mb-8">
              <SearchInput initialQuery={initialQuery} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos found for this search query"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Search;
