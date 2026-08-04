import { Flex ,Link, Icon} from '@chakra-ui/react';
import type {SocialLink} from '@/data/types';
import {SOCIAL_ICONS, SOCIAL_LABELS} from '@/lib/services/constants';

const ICON_SIZE = 22;

interface LinkTreeProps {
  socials: SocialLink[];
}

export const LinkTree = ({socials}: LinkTreeProps) => (
  <Flex alignItems="center" gridGap={2} justifyContent="center" marginY={4}>

    {socials.map((social) => (
      <Link
      aria-label={SOCIAL_LABELS[social.platform]}
      title={SOCIAL_LABELS[social.platform]}
      href={social.url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Icon as={SOCIAL_ICONS[social.platform]} boxSize={ICON_SIZE} />
    </Link>
    ))}
    
  </Flex>
);
