export const isIOS =
  /iPad|iPhone|iPod/.test(navigator.platform) ||
  (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1 && !window.MSStream);

export const snackbarErrorMsg = 'Oops! Something went wrong, please try again.';
