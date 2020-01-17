export const clipNumber = (number, lowerBound, upperBound) => {
    if (number < lowerBound) return lowerBound;
    if (number > upperBound) return upperBound;
    return number;
};