/**
 * Clamps the given number between a minimum and a maximum
 * @returns A clamped number if between minimum and maximum
 * or either minimum if number supplied is
 * less than the minimum or maximum if larger than
 **/
export const Clamp = (num: number, min: number, max: number) => {
  return num <= min ? min : num >= max ? max : num;
};
