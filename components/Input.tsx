import React from 'react';
import {
  TextInput as PaperInput,
  Colors,
  HelperText,
} from 'react-native-paper';
import MaskInput, { Mask } from 'react-native-mask-input';
import { colors } from '../utils/styles';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';
import TitleLabel from './TitleLabel';

export default function Input({
  title,
  mask,
  mode = 'outlined',
  icon,
  placeholder,
  value,
  isError = false,
  errorMessage,
  onChangeText,
  multiline,
  numberOfLines,
  hasIcon = false,
}: {
  title?: string;
  mask?: Mask;
  mode?: 'outlined' | 'flat';
  icon?: string;
  placeholder?: string;
  value: string;
  isError?: boolean;
  errorMessage?: string;
  onChangeText: (text: string) => void;
  multiline?: boolean;
  numberOfLines?: number;
  hasIcon?: boolean;
}) {
  return (
    <View style={styles.container}>
      <TitleLabel title={title} />
      <PaperInput
        mode={mode}
        outlineColor={Colors.grey300}
        activeOutlineColor={colors.primary}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        multiline={multiline}
        numberOfLines={numberOfLines}
        error={isError}
        theme={{
          roundness: 5,
          colors: {
            text: Colors.grey600,
            placeholder: Colors.grey300,
            background: Colors.white,
          },
        }}
        render={
          mask
            ? (props) => (
                <MaskInput value={props.value!} mask={mask} {...props} />
              )
            : undefined
        }
        right={
          icon ? (
            <PaperInput.Icon
              name={icon}
              color={colors.primary}
              disabled={hasIcon}
            />
          ) : undefined
        }
        style={styles.input}
      />
      {isError ? (
        <HelperText type="error" visible={isError}>
          {errorMessage}
        </HelperText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  input: {
    margin: 0,
  },
});
