import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import Input from "../../components/Input";
import CustomButton from "../../components/CustomButton";
import { Link } from "expo-router";

const SignUp = () => {
  const [form, setForm] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const submit = () => {
    setIsSubmitting(true);
    Alert.alert("Login", JSON.stringify(form), [
      {
        text: "OK",
        onPress: () => {
          setIsSubmitting(false);
        },
      },
    ]);
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
              handleChange={(value) => setForm({ ...form, username: value })}
              className="mt-7"
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
              title="Login"
              containerStyles="mt-7"
              handlePress={submit}
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
