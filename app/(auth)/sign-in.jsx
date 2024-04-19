import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import Input from "../../components/Input";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import { signIn } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const { setUser, setIsLogged } = useGlobalContext();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const submit = async () => {
    if (!form.email || !form.password) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await signIn({
        email: form.email,
        password: form.password,
      });

      setUser(result);
      setIsLogged(true);

      if (result.error) throw new Error(result.error.message);
      router.push("/home");
    } catch (error) {
      Alert.alert("Catched error", error.message);
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
              title="Sign In"
              containerStyles="mt-7"
              onPress={submit}
            />

            <View>
              <Text className="text-white text-center font-pmedium">
                Don't have an account?{" "}
                <Link href={"./sign-up"} className="text-secondary-200">
                  Sign up
                </Link>
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
