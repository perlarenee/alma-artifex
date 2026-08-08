import { Box, Grid, Heading, Text } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import type { VideoOptions } from '@/data/types';

declare global {
  interface Window {
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
        },
      ) => {
        destroy: () => void;
      };
    };
    onYouTubeIframeAPIReady?: () => void;
    Vimeo?: {
      Player: new (
        element: HTMLIFrameElement,
        options: Record<string, unknown>,
      ) => {
        on: (event: string, callback: (...args: unknown[]) => void) => void;
        destroy: () => void;
      };
    };
  }
}

interface VideoSectionProps {
  videoOptions: VideoOptions[];
}

export const VideoSection = ({ videoOptions }: VideoSectionProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const youtubeContainerRef = useRef<HTMLDivElement | null>(null);
  const vimeoIframeRef = useRef<HTMLIFrameElement | null>(null);
  const youtubePlayerRef = useRef<{ destroy: () => void } | null>(null);
  const vimeoPlayerRef = useRef<{ on: (event: string, callback: (...args: unknown[]) => void) => void; destroy: () => void } | null>(null);
  const videoOption = videoOptions?.find((option) => option.videoSource === 'yt' || option.videoSource === 'vim');

  const hasThumbnail = Boolean(videoOption?.videoThumb?.trim());
  const shouldLazyLoad = typeof HTMLImageElement !== 'undefined' && 'loading' in HTMLImageElement.prototype;

  useEffect(() => {
    if (!isPlaying || videoOption?.videoSource !== 'yt' || !youtubeContainerRef.current) {
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
      if (cancelled || !window.YT || !youtubeContainerRef.current || !videoOption?.videoID) {
        return;
      }

      youtubePlayerRef.current?.destroy();
      youtubePlayerRef.current = new window.YT.Player(youtubeContainerRef.current, {
        videoId: videoOption.videoID,
        host: 'https://www.youtube-nocookie.com',
        playerVars: {
          autoplay: 1,
          modestbranding: 1,
          color: 'white',
          rel: 0,
        },
        events: {
          onStateChange: (event) => {
            if (event.data === 0) {
              setIsPlaying(false);
            }
          },
        },
      });
    });

    return () => {
      cancelled = true;
      youtubePlayerRef.current?.destroy();
      youtubePlayerRef.current = null;
    };
  }, [isPlaying, videoOption?.videoID, videoOption?.videoSource]);

  useEffect(() => {
    if (!isPlaying || videoOption?.videoSource !== 'vim' || !vimeoIframeRef.current) {
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
        script.onerror = () => reject(new Error('Failed to load Vimeo player API'));
        document.body.appendChild(script);
      });
    };

    loadVimeoApi()
      .then(() => {
        if (cancelled || !window.Vimeo || !vimeoIframeRef.current || !videoOption?.videoID) {
          return;
        }

        vimeoPlayerRef.current?.destroy();
        vimeoPlayerRef.current = new window.Vimeo.Player(vimeoIframeRef.current, {
          id: videoOption.videoID,
          autoplay: true,
          controls: true,
          dnt: true,
        });

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

  return (
    <Grid gap={4} textAlign="center">
      <Heading fontWeight="extrabold" size="lg">
        Let's talk!
      </Heading>

      {videoOption?.videoQuestion && (
        <Text color="fg.muted" fontStyle="italic">"{videoOption?.videoQuestion}"</Text>
      )}

      {isPlaying && videoOption?.videoSource === 'yt' ? (
        <Box mx="auto" w="full" maxW="container.md" overflow="hidden" borderRadius="md">
          <Box position="relative" w="full" aspectRatio="16 / 9">
            <div ref={youtubeContainerRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
          </Box>
        </Box>
      ) : isPlaying && videoOption?.videoSource === 'vim' ? (
        <Box mx="auto" w="full" maxW="container.md" overflow="hidden" borderRadius="md">
          <Box position="relative" w="full" aspectRatio="16 / 9">
            <iframe
              ref={vimeoIframeRef}
              src={`https://player.vimeo.com/video/${videoOption.videoID}?autoplay=1&title=0&byline=0&portrait=0`}
              title="Vimeo video"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                border: 0,
                borderRadius: 'var(--chakra-radii-md)',
              }}
            />
          </Box>
        </Box>
      ) : hasThumbnail ? (
        <Box
          mx="auto"
          w="full"
          maxW="container.md"
          overflow="hidden"
          borderRadius="md"
          cursor="pointer"
          onClick={() => setIsPlaying(true)}
          role="button"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              setIsPlaying(true);
            }
          }}
        >
          <Box position="relative" w="full" aspectRatio="16 / 9" bg="blackAlpha.800">
            <img
              src={videoOption?.videoThumb}
              alt={videoOption?.videoQuestion ?? 'Video preview'}
              loading={shouldLazyLoad ? 'lazy' : undefined}
              decoding="async"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
            <Box
              position="absolute"
              inset={0}
              display="flex"
              alignItems="center"
              justifyContent="center"
              bg="blackAlpha.400"
              color="white"
              fontSize="4xl"
              fontWeight="bold"
            >
              ▶
            </Box>
          </Box>
        </Box>
      ) : (
        <Box
          mx="auto"
          w="full"
          maxW="container.md"
          borderRadius="md"
          borderWidth="1px"
          borderColor="gray.200"
          p={6}
          cursor="pointer"
          onClick={() => setIsPlaying(true)}
          role="button"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              setIsPlaying(true);
            }
          }}
        >
          <Text color="fg.muted">Play video</Text>
        </Box>
      )}
    </Grid>
  );
};
