export const transformIcon = (iconURL: string, className: string) => {
  return L.divIcon({
    html: `<img src=${iconURL} alt="icon" />`,
    className: className,
  });
};
