import { useState } from "react";
import { Link, router } from "expo-router";
import { Dimensions, Alert } from "react-native";

import { images } from "../../constants";
import { createUser } from "../../lib/appwrite";
import { CustomButton, Input } from "../../components";
import { useGlobalContext } from "../../context/GlobalProvider";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "../../api/elements";
const SignUp = () => {
  const { setUser, setIsLogged } = useGlobalContext();

  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const submit = async () => {
    if (form.username === "" || form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
    }

    setSubmitting(true);
    try {
      const result = await createUser({
        email: form.email,
        password: form.password,
        username: form.username,
      });

      setUser(result);
      setIsLogged(true);

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
            Sign Up to Aora
          </Text>

          <Input
            placeholder="Enter your username"
            label="Username"
            value={form.username}
            onChangeText={(e) => setForm({ ...form, username: e })}
            className="mt-10"
          />

          <Input
            placeholder="Enter your email"
            label="Email"
            value={form.email}
            onChangeText={(e) => setForm({ ...form, email: e })}
            className="mt-7"
            keyboardType="email-address"
          />

          <Input
            placeholder="Enter your password"
            label="Password"
            value={form.password}
            onChangeText={(e) => setForm({ ...form, password: e })}
            className="mt-7"
          />

          <CustomButton
            title="Sign Up"
            onPress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Have an account already?
            </Text>
            <Link
              href="/sign-in"
              className="text-lg font-psemibold text-secondary"
            >
              Login
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
