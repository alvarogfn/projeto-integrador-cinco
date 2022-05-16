import React from "react";
import { TextInput as PaperInput } from "react-native-paper";
import MaskInput from "react-native-mask-input";
import { colors } from "../utils/styles";

export default function Input(props) {
  return (
    <PaperInput
      mode={props.mode || "outlined"}
      theme={{
        colors: { text: colors.textBlack, primary: colors.secondary },
      }}
      activeUnderlineColor={colors.primary}
      style={{ backgroundColor: "#FFFFFF", margin: 5, ...props.style }}
      render={props.mask ? (props) => <MaskInput {...props} /> : undefined}
      right={
        props.icon ? (
          <PaperInput.Icon
            name={props.icon}
            color={colors.secondary}
            disabled={props.disabled}
          />
        ) : undefined
      }
      {...props}
    />
  );
}
