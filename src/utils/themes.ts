import { type ButtonVariant } from '../components/button/types';

const defaultButtonStyles = 'group relative flex w-full justify-center';
const appThemes = {
  button: {
    default: defaultButtonStyles,
    primary: `${defaultButtonStyles} bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`,
    secondary: `${defaultButtonStyles} bg-white px-3 py-2 text-sm font-semibold text-indigo-600 hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`,
    roundedDefault: 'rounded-md',
    rounded: 'rounded-full'
  }
};

const getButtonTheme = (variant: ButtonVariant, rounded: boolean): string => {
  const roundStyle = rounded ? themes.button.rounded : themes.button.roundedDefault;
  if (variant === 'primary') {
    return themes.button.primary + ' '.concat(roundStyle);
  }

  if (variant === 'secondary') {
    return themes.button.secondary;
  }

  return themes.button.default;
};

export const themes = { ...appThemes, getButtonTheme };
