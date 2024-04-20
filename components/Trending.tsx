import { useState } from "react";
import { ResizeMode } from "expo-av";

import { icons } from "../constants";
import {
  AnimatableView,
  FlatList,
  Image,
  ImageBackground,
  TouchableOpacity,
  Video,
} from "../api/elements";
import { Post } from "../types/post";

const TrendingItem = ({
  activeItem,
  item,
}: {
  activeItem: Post;
  item: Post;
}) => {
  const [play, setPlay] = useState(false);

  return (
    <AnimatableView
      className="mr-5"
      animation={activeItem["$id"] === item.$id ? "zoomIn" : "zoomOut"}
      duration={500}
    >
      {play ? (
        <Video
          source={{ uri: item.video }}
          className="w-52 h-72 rounded-[33px] mt-3 bg-white/10"
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if (status.isLoaded && status.didJustFinish) {
              setPlay(false);
            }
          }}
        />
      ) : (
        <TouchableOpacity
          className="relative flex justify-center items-center"
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <ImageBackground
            source={{
              uri: item.thumbnail,
            }}
            className="w-52 h-72 rounded-[33px] my-5 overflow-hidden shadow-lg shadow-black/40"
            resizeMode="cover"
          />

          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </AnimatableView>
  );
};

const Trending = ({ posts }: { posts: Post[] }) => {
  const [activeItem, setActiveItem] = useState<Post>(posts[0]);

  const viewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].item);
    }
  };

  return (
    <FlatList
      data={posts}
      horizontal
      keyExtractor={(item: Post) => item.$id}
      renderItem={({ item }: any) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      contentOffset={{
        x: 170,
        y: 0,
      }}
    />
  );
};

export default Trending;
