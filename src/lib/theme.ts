// Material UI Base Colors
export const colors = {
  // Grey scale (Material UI base)
  grey: {
    0: '#000000',
    10: '#1B1B1C',
    20: '#303030',
    30: '#474747',
    40: '#5E5E5E',
    50: '#777777',
    60: '#919191',
    70: '#ABABAB',
    80: '#C7C7C7',
    90: '#E3E3E3',
    95: '#F2F2F2',
    98: '#F9F9F9',
    100: '#FFFFFF',
  },
  // Accent colors (keep gradients)
  orange: {
    from: '#FF5A39',
    to: '#FF9E75',
  },
  blue: {
    from: '#8189C6',
    to: '#303FAE',
  },
  purple: {
    from: '#A86CCF',
    to: '#6B488D',
  },
  bluePurple: {
    from: '#3B82F6',
    to: '#A86CCF',
  },
};

export const lightTheme = {
  background: colors.grey[100],
  surface: colors.grey[100],
  surfaceSecondary: colors.grey[98],
  border: colors.grey[90],
  text: {
    primary: colors.grey[30], // Grey 30 for primary text
    secondary: colors.grey[70], // Grey 70 for secondary text
    disabled: colors.grey[80],
  },
  hover: colors.grey[95],
  selected: colors.grey[95],
  input: {
    background: colors.grey[100],
    border: colors.grey[90],
  },
};

export const darkTheme = {
  background: colors.grey[10],
  surface: colors.grey[20],
  surfaceSecondary: colors.grey[30],
  border: colors.grey[30],
  text: {
    primary: colors.grey[98], // Grey 98 for primary text in dark mode
    secondary: colors.grey[80], // Grey 80 for secondary text in dark mode
    disabled: colors.grey[60],
  },
  hover: colors.grey[30],
  selected: colors.grey[30],
  input: {
    background: colors.grey[20],
    border: colors.grey[30],
  },
};

export type Theme = typeof lightTheme;
