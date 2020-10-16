import { Exception_OutOfBounds } from "./customErrors";

declare global {
  interface Array<T> {
    /**
     * Shorthand for creating an average by a single attribute
     *
     * Examples:
     * ```typescript
     * const averageScore = myArr.average(x => x.score);
     * // Can also be used on arrays of numbers
     * const averageScore = [1,2,3].average(); // returns 2
     * ```
     */
    average(callbackfn?: (value: T) => number, roundNum?: number | null, thisArg?: any[]): number;
  }
}

Array.prototype.average = function (func = x => x, round = null, thisArg = this) {
  if (thisArg.length <= 0) throw new Exception_OutOfBounds();
  if (round !== null) {
    if (round < 0) throw new Exception_OutOfBounds();
    const roundInTens = 10 ** round;
    return Math.round((thisArg.sum(func, thisArg) / thisArg.length) * roundInTens) / roundInTens;
  }
  return thisArg.sum(func, thisArg) / thisArg.length;
};
