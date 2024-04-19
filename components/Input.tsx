import React, { useState } from "react";
import { icons } from "../constants";
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "../api/elements";
import { TextInputProps } from "react-native";
interface InputProps extends TextInputProps {
  label: string;
  placeholder: string;
  handleChange: (text: string) => void;
  value: string;
  className?: string;
}

const Input = ({
  label,
  placeholder,
  handleChange,
  value,
  className,
  ...props
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View className={`py-2 gap-1 ${className}`}>
      <Text className="text-base text-gray-100 font-pmedium">{label}</Text>
      <View
        className="
      border-black-200 border-2 rounded-2xl flex flex-row justify-center items-center gap-2 h-16 py-0 pl-2 pr-4 m-0 bg-black-100 focus:border-secondary
      "
      >
        <TextInput
          className="flex-1 h-full text-white font-psemibold text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7B7B8B"
          onChangeText={handleChange}
          secureTextEntry={label === "Password" && !showPassword}
          {...props}
        />

        {label === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Input;
