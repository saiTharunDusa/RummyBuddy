import { useNavigation } from "@react-navigation/native";
import { Routes } from "./Routes";

export const useGoToHome = () => {
  const navigation = useNavigation();
  return () => {
    navigation.reset({
      index: 0,
      routes: [{ name: Routes.Home }],
    });
  };
};
