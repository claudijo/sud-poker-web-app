export const cropEnd = (text, ellipses = '…') => {
  const main = text.replace(new RegExp(`${ellipses}$`), '');

  if (main === '') {
    return main;
  }

  const cropped = main.slice(0, -1);
  return cropped + ellipses;
}

export const capitalizeFirstLetter = text => {
  return text.charAt(0).toUpperCase() + text.slice(1);
}