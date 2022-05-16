import React from "react";
import { TextInput as PaperInput } from "react-native-paper";
import { colors } from "../utils/styles";

export default function Input(props) {
  return (
    <PaperInput
      mode={props.mode || "outlined"}
      theme={{ colors: { text: colors.textBlack, primary: colors.secondary } }}
      activeUnderlineColor={colors.primary}
      style={{ backgroundColor: "#FFFFFF", margin: 5 }}
      {...props}
    />
  );
}
