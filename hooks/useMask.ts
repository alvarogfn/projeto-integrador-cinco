import { Mask, formatWithMask } from 'react-native-mask-input';

export function useMask(mask: Mask, value: string) {
  const { masked, unmasked } = formatWithMask({
    text: value,
    mask: mask,
  });

  return { masked, unmasked };
}
