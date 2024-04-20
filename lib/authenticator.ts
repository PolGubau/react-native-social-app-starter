import * as LocalAuthentication from "expo-local-authentication";
import { Alert } from "react-native";

export const Authenthicator = {
  async unlock(): Promise<boolean> {
    const hasBiometric = await LocalAuthentication.hasHardwareAsync();
    if (!hasBiometric) {
      Alert.prompt("Biometric authentication is not available on this device.");
      return false;
    }

    const savedBiometrics = await LocalAuthentication.isEnrolledAsync();
    if (!savedBiometrics)
      Alert.prompt("Biometric record not found", "Please login with password");

    // Auth
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Use biometric to acces TrackUp.",
      fallbackLabel: "Use passcode instead?",
      disableDeviceFallback: true,
      cancelLabel: "Use user and password instead",
    });
    if (result.success) {
      return true;
    }
    return false;
  },
};
