import { useColorModeValue } from '@/lib/components/ui/color-mode';
import type { HeadingProps } from '@chakra-ui/react';
import { Heading } from '@chakra-ui/react';

import { useProfile } from '@/lib/components/ui/profile-provider';

interface SectionHeaderProps extends Omit<HeadingProps, 'children'> {
  children: React.ReactNode;
  color?: string;
  colorDark?: string;
  colorLight?: string;
  usePaletteColor?: boolean;
}

export const SectionHeader = ({
  children,
  color,
  colorDark,
  colorLight,
  size = { base: 'xl', lg: '3xl', md: '2xl' },
  usePaletteColor = false,
  ...props
}: SectionHeaderProps) => {
  const profile = useProfile();
  const [options] = profile?.profileOptions ?? [];
  const paletteName = options?.colorPalette ?? 'teal';

  const resolvedColor = usePaletteColor
    ? color
      ? `${color}.500`
      : `${paletteName}.500`
    : color;

  const resolvedColorLight = colorLight ?? resolvedColor;
  const resolvedColorDark = colorDark ?? resolvedColor;
  const themeColor = useColorModeValue(resolvedColorLight, resolvedColorDark);

  return (
    <Heading color={themeColor} size={size} {...props}>
      {children}
    </Heading>
  );
};
