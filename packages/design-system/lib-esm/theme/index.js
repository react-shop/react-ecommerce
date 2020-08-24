import colors from './colors';
import units from './units';
export const theme = {
    colors: {
        ...colors,
    },
    space: {
        ...units.sizes,
    },
    radii: {
        ...units.borderRadius,
    },
};
