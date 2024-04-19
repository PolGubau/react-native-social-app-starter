import React from "react";
import { Text, TouchableOpacity } from "../api/elements";
import { TouchableOpacityProps } from "react-native";
export interface CustomButtonProps extends TouchableOpacityProps {
  title: string;
  isLoading?: boolean;
  containerStyles?: string;
  textStyles?: string;
}
const CustomButton = ({
  title,
  isLoading,
  containerStyles,
  textStyles,
  ...props
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      {...props}
      activeOpacity={0.7}
      className={`bg-secondary rounded-xl min-h-[62px] justify-center items-center ${containerStyles} ${
        isLoading ? "bg-opacity-50" : ""
      }`}
      disabled={isLoading}
    >
      <Text className={`text-primary font-psemibold text-lg ${textStyles}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
