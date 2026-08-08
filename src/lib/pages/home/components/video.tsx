import { Box, Grid, Text } from '@chakra-ui/react';
import {
  type KeyboardEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import type { VideoOptions } from '@/data/types';
import { RevealOnScroll } from '@/lib/components/ui/reveal-on-scroll';
import { SectionHeader } from '@/lib/components/ui/section-header';

declare global {
  interface Window {
    onYouTubeIframeAPIReady?: () => void;
    Vimeo?: {
      Player: new (
        element: HTMLIFrameElement,
        options: Record<string, unknown>
      ) => {
        on: (
          event: string,
          callback: (...args: Array<unknown>) => void
        ) => void;
        destroy: () => void;
      };
    };
    YT?: {
      Player: new (
        element: HTMLElement,
        options: {
          videoId?: string;
          host?: string;
          playerVars?: Record<string, string | number | boolean>;
          events?: {
            onReady?: (event: { target: unknown }) => void;
            onStateChange?: (event: { data: number }) => void;
          };
        }
      ) => {
        destroy: () => void;
      };
    };
  }
}

interface VideoSectionProps {
  videoOptions: Array<VideoOptions>;
}

export const VideoSection = ({ videoOptions }: VideoSectionProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const youtubeContainerRef = useRef<HTMLDivElement | null>(null);
  const vimeoIframeRef = useRef<HTMLIFrameElement | null>(null);
  const youtubePlayerRef = useRef<{ destroy: () => void } | null>(null);
  const vimeoPlayerRef = useRef<{
    on: (event: string, callback: (...args: Array<unknown>) => void) => void;
    destroy: () => void;
  } | null>(null);
  const videoOption = videoOptions.find(
    (option) => option.videoSource === 'yt' || option.videoSource === 'vim'
  );

  const hasThumbnail = Boolean(videoOption?.videoThumb?.trim());
  const shouldLazyLoad =
    typeof HTMLImageElement !== 'undefined' &&
    'loading' in HTMLImageElement.prototype;
  const startPlayback = useCallback(() => {
    setIsPlaying(true);
  }, []);

  const handlePreviewKeyDown = useCallback(
    (event: KeyboardEvent<HTMLElement>) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        startPlayback();
      }
    },
    [startPlayback]
  );

  useEffect(() => {
    if (
      !isPlaying ||
      videoOption?.videoSource !== 'yt' ||
      !youtubeContainerRef.current
    ) {
      youtubePlayerRef.current?.destroy();
      youtubePlayerRef.current = null;
      return;
    }

    let cancelled = false;

    const loadYouTubeApi = () => {
      if (window.YT?.Player) {
        return Promise.resolve();
      }

      return new Promise<void>((resolve) => {
        const existingScript = document.getElementById('youtube-iframe-api');

        if (existingScript) {
          if (window.YT?.Player) {
            resolve();
            return;
          }

          window.onYouTubeIframeAPIReady = () => resolve();
          return;
        }

        const script = document.createElement('script');
        script.id = 'youtube-iframe-api';
        script.src = 'https://www.youtube.com/iframe_api';
        script.async = true;
        document.body.appendChild(script);
        window.onYouTubeIframeAPIReady = () => resolve();
      });
    };

    loadYouTubeApi().then(() => {
      if (
        cancelled ||
        !window.YT ||
        !youtubeContainerRef.current ||
        !videoOption?.videoID
      ) {
        return;
      }

      youtubePlayerRef.current?.destroy();
      youtubePlayerRef.current = new window.YT.Player(
        youtubeContainerRef.current,
        {
          events: {
            onStateChange: (event) => {
              if (event.data === 0) {
                setIsPlaying(false);
              }
            },
          },
          host: 'https://www.youtube-nocookie.com',
          playerVars: {
            autoplay: 1,
            color: 'white',
            modestbranding: 1,
            rel: 0,
          },
          videoId: videoOption.videoID,
        }
      );
    });

    return () => {
      cancelled = true;
      youtubePlayerRef.current?.destroy();
      youtubePlayerRef.current = null;
    };
  }, [isPlaying, videoOption?.videoID, videoOption?.videoSource]);

  useEffect(() => {
    if (
      !isPlaying ||
      videoOption?.videoSource !== 'vim' ||
      !vimeoIframeRef.current
    ) {
      vimeoPlayerRef.current?.destroy();
      vimeoPlayerRef.current = null;
      return;
    }

    let cancelled = false;

    const loadVimeoApi = () => {
      if (window.Vimeo?.Player) {
        return Promise.resolve();
      }

      return new Promise<void>((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://player.vimeo.com/api/player.js';
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () =>
          reject(new Error('Failed to load Vimeo player API'));
        document.body.appendChild(script);
      });
    };

    loadVimeoApi()
      .then(() => {
        if (
          cancelled ||
          !window.Vimeo ||
          !vimeoIframeRef.current ||
          !videoOption?.videoID
        ) {
          return;
        }

        vimeoPlayerRef.current?.destroy();
        vimeoPlayerRef.current = new window.Vimeo.Player(
          vimeoIframeRef.current,
          {
            autoplay: true,
            controls: true,
            dnt: true,
            id: videoOption.videoID,
          }
        );

        vimeoPlayerRef.current.on('ended', () => {
          setIsPlaying(false);
        });
      })
      .catch(() => {
        setIsPlaying(false);
      });

    return () => {
      cancelled = true;
      vimeoPlayerRef.current?.destroy();
      vimeoPlayerRef.current = null;
    };
  }, [isPlaying, videoOption?.videoID, videoOption?.videoSource]);

  let videoContent: React.JSX.Element;

  if (isPlaying && videoOption?.videoSource === 'yt') {
    videoContent = (
      <Box
        borderRadius="md"
        maxW="container.md"
        mx="auto"
        overflow="hidden"
        w="full"
      >
        <Box aspectRatio="16 / 9" position="relative" w="full">
          <div
            ref={youtubeContainerRef}
            style={{
              height: '100%',
              inset: 0,
              position: 'absolute',
              width: '100%',
            }}
          />
        </Box>
      </Box>
    );
  } else if (isPlaying && videoOption?.videoSource === 'vim') {
    videoContent = (
      <Box
        borderRadius="md"
        maxW="container.md"
        mx="auto"
        overflow="hidden"
        w="full"
      >
        <Box aspectRatio="16 / 9" position="relative" w="full">
          <iframe
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            loading="lazy"
            ref={vimeoIframeRef}
            referrerPolicy="strict-origin-when-cross-origin"
            src={`https://player.vimeo.com/video/${videoOption.videoID}?autoplay=1&title=0&byline=0&portrait=0`}
            style={{
              border: 0,
              borderRadius: 'var(--chakra-radii-md)',
              height: '100%',
              inset: 0,
              position: 'absolute',
              width: '100%',
            }}
            title="Vimeo video"
          />
        </Box>
      </Box>
    );
  } else if (hasThumbnail) {
    videoContent = (
      <Box
        borderRadius="md"
        cursor="pointer"
        maxW="container.md"
        mx="auto"
        onClick={startPlayback}
        onKeyDown={handlePreviewKeyDown}
        overflow="hidden"
        role="button"
        tabIndex={0}
        w="full"
      >
        <Box
          aspectRatio="16 / 9"
          bg="blackAlpha.800"
          position="relative"
          w="full"
        >
          <img
            alt={videoOption?.videoQuestion ?? 'Video preview'}
            decoding="async"
            loading={shouldLazyLoad ? 'lazy' : undefined}
            src={videoOption?.videoThumb}
            style={{
              height: '100%',
              inset: 0,
              objectFit: 'cover',
              position: 'absolute',
              width: '100%',
            }}
          />
          <Box
            alignItems="center"
            bg="blackAlpha.400"
            color="white"
            display="flex"
            fontSize="4xl"
            fontWeight="bold"
            inset={0}
            justifyContent="center"
            position="absolute"
          >
            ▶
          </Box>
        </Box>
      </Box>
    );
  } else {
    videoContent = (
      <Box
        borderColor="gray.200"
        borderRadius="md"
        borderWidth="1px"
        cursor="pointer"
        maxW="container.md"
        mx="auto"
        onClick={startPlayback}
        onKeyDown={handlePreviewKeyDown}
        p={6}
        role="button"
        tabIndex={0}
        w="full"
      >
        <Text color="fg.muted">Play video</Text>
      </Box>
    );
  }

  return (
    <Grid gap={4} textAlign="center">
      <RevealOnScroll>
        <SectionHeader p={4}>LET'S TALK...</SectionHeader>
      </RevealOnScroll>
      {videoOption?.videoQuestion ? (
        <Text color="fg.muted" fontStyle="italic">
          "{videoOption?.videoQuestion}"
        </Text>
      ) : null}

      <RevealOnScroll>{videoContent}</RevealOnScroll>
    </Grid>
  );
};
