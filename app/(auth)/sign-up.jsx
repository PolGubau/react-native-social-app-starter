import { Link, router } from "expo-router";
import React, { useState } from "react";
import { Alert, Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/CustomButton";
import Input from "../../components/Input";
import { images } from "../../constants";
import { createUser } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";

const SignUp = () => {
  const [form, setForm] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const { setUser, setIsLogged } = useGlobalContext();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const submit = async () => {
    if (!form.userName || !form.email || !form.password) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await createUser({
        username: form.userName,
        password: form.password,
        email: form.email,
      });

      setUser(result);
      setIsLogged(true);
      if (result.error) throw new Error(result.error.message);
      router.push("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="min-h-[85vh] w-full justify-center my-6 px-4">
          <Image
            source={images.logo}
            className="w-[115px] h-[35px] "
            resizeMode="contain"
          />
          <Text className="text-white text-2xl font-semibold mt-10 font-psemibold">
            Login to Aora
          </Text>
          <View className="mt-8 space-y-6">
            <Input
              label="UserName"
              placeholder="Enter your username"
              value={form.userName}
              handleChange={(value) => setForm({ ...form, userName: value })}
              className="mt-10"
            />
            <Input
              label="Email"
              placeholder="Enter your email"
              value={form.email}
              handleChange={(value) => setForm({ ...form, email: value })}
              className="mt-7"
              keyboardType="email-address"
            />
            <Input
              label="Password"
              placeholder="Enter your password"
              value={form.password}
              handleChange={(value) => setForm({ ...form, password: value })}
              className="mt-7"
              keyboardType="password"
            />

            <CustomButton
              isLoading={isSubmitting}
              title="Sign Up"
              containerStyles="mt-7"
              onPress={submit}
            />

            <View>
              <Text className="text-white text-center font-pmedium">
                Already have an account?{" "}
                <Link href={"./sign-in"} className="text-secondary-200">
                  Sign in
                </Link>
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
