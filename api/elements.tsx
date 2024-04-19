import { styled } from "nativewind";
import {
  Image as NativeImage,
  ScrollView as NativeScrollView,
  Text as NativeText,
  View as NativeView,
  TouchableOpacity as NativeTouchableOpacity,
  FlatList as NativeFlatList,
} from "react-native";
import { SafeAreaView as NativeSafeAreaView } from "react-native-safe-area-context";

export const TouchableOpacity = styled(NativeTouchableOpacity);
export const View = styled(NativeView);
export const SafeAreaView = styled(NativeSafeAreaView);
export const Image = styled(NativeImage);
export const ScrollView = styled(NativeScrollView);
export const Text = styled(NativeText);
export const FlatList = styled(NativeFlatList);
