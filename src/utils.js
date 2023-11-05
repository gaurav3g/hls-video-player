export const zeroPad = (num, places) => String(num).padStart(places, '0');

export const displayTime = (s) => (`${zeroPad(parseInt(s/60), 2)}:${zeroPad(parseInt(s%60), 2)}`);
