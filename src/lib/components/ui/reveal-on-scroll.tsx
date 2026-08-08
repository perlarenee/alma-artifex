import { Box } from '@chakra-ui/react';
import { type ReactNode, useEffect, useRef, useState } from 'react';

interface RevealOnScrollProps {
  children: ReactNode;
  delay?: string;
  once?: boolean;
  offset?: string;
  opacityDuration?: string;
  rootMargin?: string;
  threshold?: number;
  transformDuration?: string;
}

export const RevealOnScroll = ({
  children,
  delay = '0s',
  once = true,
  offset = '0px',
  opacityDuration = '1s',
  rootMargin,
  threshold = 0.15,
  transformDuration = '1s',
}: RevealOnScrollProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current) {
      return;
    }

    const observerRootMargin = rootMargin ?? `0px 0px ${offset} 0px`;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);

          if (once) {
            observer.disconnect();
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { rootMargin: observerRootMargin, threshold }
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [offset, once, rootMargin, threshold]);

  return (
    <Box ref={containerRef} w="full">
      <Box
        opacity={isVisible ? 1 : 0}
        transform={isVisible ? 'translateY(0)' : 'translateY(60px)'}
        transition={`opacity ${opacityDuration} ease ${delay}, transform ${transformDuration} ease ${delay}`}
        w="full"
        willChange="opacity, transform"
      >
        {children}
      </Box>
    </Box>
  );
};
