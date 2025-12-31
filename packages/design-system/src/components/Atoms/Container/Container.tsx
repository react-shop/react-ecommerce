import { styled } from '@styled-system/jsx';

export const Container = styled('div', {
  base: {
    maxWidth: '1280px',
    mx: 'auto',
    px: { base: '4', md: '6', lg: '8' },
    width: '100%',
  },
});

Container.displayName = 'Container';
