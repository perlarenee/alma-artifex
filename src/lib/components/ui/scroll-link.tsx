import { Link as ChakraLink, type LinkProps } from '@chakra-ui/react';
import type { MouseEvent } from 'react';

import { scrollToSection } from '@/lib/utils/scroll';

interface ScrollLinkProps extends LinkProps {
  offset?: number;
  sectionId?: string;
}

export const ScrollLink = ({
  children,
  href,
  offset = 0,
  onClick,
  sectionId,
  ...props
}: ScrollLinkProps) => {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (sectionId) {
      event.preventDefault();
      scrollToSection({
        id: sectionId,
        offset,
      });
    }

    onClick?.(event);
  };

  return (
    <ChakraLink href={href} onClick={handleClick} {...props}>
      {children}
    </ChakraLink>
  );
};
