import { Flex, Icon, Link } from '@chakra-ui/react';

import type { SocialLink } from '@/data/types';
import { SOCIAL_ICONS, SOCIAL_LABELS } from '@/lib/services/constants';

const ICON_SIZE = 22;

interface LinkTreeProps {
  socials: Array<SocialLink>;
}

export const LinkTree = ({ socials }: LinkTreeProps) => (
  <Flex alignItems="center" gridGap={2} justifyContent="center" marginY={4}>
    {socials.map((social) => (
      <Link
        aria-label={SOCIAL_LABELS[social.platform]}
        href={social.url}
        key={social.platform}
        rel="noopener noreferrer"
        target="_blank"
        title={SOCIAL_LABELS[social.platform]}
      >
        <Icon as={SOCIAL_ICONS[social.platform]} boxSize={ICON_SIZE} />
      </Link>
    ))}
  </Flex>
);
