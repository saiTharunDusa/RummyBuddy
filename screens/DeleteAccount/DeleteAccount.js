import React, { useEffect } from "react";
import { Linking } from "react-native";

const DeleteAccount = () => {
  useEffect(() => {
    Linking.openURL("https://saitharundusa.github.io/");
  }, []);

  return null;
};

export default DeleteAccount;
