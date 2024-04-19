import { useState } from "react";
import { Link, router } from "expo-router";
import { Dimensions, Alert } from "react-native";

import { images } from "../../constants";
import { CustomButton, Input } from "../../components";
import { getCurrentUser, signIn } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "../../api/elements";

const SignIn = () => {
  const { setUser, setIsLogged } = useGlobalContext();
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const submit = async () => {
    if (form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
    }

    setSubmitting(true);

    try {
      await signIn({ email: form.email, password: form.password });
      const result = await getCurrentUser();
      setUser(result);
      setIsLogged(true);

      Alert.alert("Success", "User signed in successfully");
      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View
          className="w-full flex justify-center h-full px-4 my-6"
          style={{
            minHeight: Dimensions.get("window").height - 100,
          }}
        >
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[34px]"
          />

          <Text className="text-2xl font-semibold text-white mt-10 font-psemibold">
            Log in to Aora
          </Text>

          <Input
            placeholder="Enter your email"
            label="Email"
            value={form.email}
            onChangeText={(e) => setForm({ ...form, email: e })}
            className="mt-7"
            keyboardType="email-address"
          />

          <Input
            label="Password"
            placeholder="Enter your password"
            value={form.password}
            onChangeText={(e) => setForm({ ...form, password: e })}
            className="mt-7"
          />

          <CustomButton
            title="Sign In"
            onPress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have an account?
            </Text>
            <Link
              href="/sign-up"
              className="text-lg font-psemibold text-secondary"
            >
              Signup
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
