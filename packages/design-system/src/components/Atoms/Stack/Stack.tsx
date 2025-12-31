import { styled } from '@styled-system/jsx';

export const Stack = styled('div', {
  base: {
    display: 'flex',
    flexDirection: 'column',
  },
});

Stack.displayName = 'Stack';
