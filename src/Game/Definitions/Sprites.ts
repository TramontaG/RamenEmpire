const getIndex = (cols: number, x: number, y: number) => {
  return y * cols + x;
};

const idleKidFrames = {
  right: [24, 25, 26, 27, 28, 29],
  up: [30, 31, 32, 33, 34, 35],
  left: [36, 37, 38, 39, 40, 41],
  down: [42, 43, 44, 45, 46, 47],
};

const walkKidFrames = {
  right: [48, 49, 50, 51, 52, 53],
  up: [54, 55, 56, 57, 58, 59],
  left: [60, 61, 62, 63, 64, 65],
  down: [66, 67, 68, 69, 70, 71],
};

const idleAdultFrames = {
  right: [
    [1, 0],
    [1, 1],
    [1, 2],
    [1, 3],
    [1, 4],
    [1, 5],
  ].map(([x, y]) => getIndex(56, x, y)),
  up: [
    [1, 6],
    [1, 7],
    [1, 8],
    [1, 9],
    [1, 10],
    [1, 11],
  ].map(([x, y]) => getIndex(56, x, y)),
  left: [
    [1, 12],
    [1, 13],
    [1, 14],
    [1, 15],
    [1, 16],
    [1, 17],
  ].map(([x, y]) => getIndex(56, x, y)),
  down: [
    [1, 18],
    [1, 19],
    [1, 20],
    [1, 21],
    [1, 22],
    [1, 23],
  ].map(([x, y]) => getIndex(56, x, y)),
};

const walkAdultFrames = {
  right: [
    [2, 0],
    [2, 1],
    [2, 2],
    [2, 3],
    [2, 4],
    [2, 5],
  ].map(([x, y]) => getIndex(56, x, y)),
  up: [
    [2, 6],
    [2, 7],
    [2, 8],
    [2, 9],
    [2, 10],
    [2, 11],
  ].map(([x, y]) => getIndex(56, x, y)),
  left: [
    [2, 12],
    [2, 13],
    [2, 14],
    [2, 15],
    [2, 16],
    [2, 17],
  ].map(([x, y]) => getIndex(56, x, y)),
  down: [
    [2, 18],
    [2, 19],
    [2, 20],
    [2, 21],
    [2, 22],
    [2, 23],
  ].map(([x, y]) => getIndex(56, x, y)),
};

export const createSpriteAnimation = (name: string) => {
  if (name.toLowerCase().startsWith("kid")) {
    return {
      idle: idleKidFrames,
      walk: walkKidFrames,
    };
  }

  if (name.startsWith("ui:")) {
    return {
      primary: [0, 1],
      secondary: [2, 3],
      tertiary: [4, 5],
    };
  }

  return {
    idle: idleAdultFrames,
    walk: walkAdultFrames,
  };
};

export const createFaceAnimation = () => {
  return {
    talking: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    yes: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
    no: [20, 21, 22, 23, 24, 25, 26, 27, 28, 29],
  };
};

export const createUIspriteAnimation = (name: string) => {
  if (!name.startsWith("ui:")) {
    throw new Error(
      `createUIspriteAnimation expects a ui:* name, got: ${name}`
    );
  }

  return {
    primary: [0, 1],
    secondary: [2, 3],
    tertiary: [4, 5],
  };
};

export const spriteSize = [16, 16] as const;
export const kidSpritesheetSize = [16, 32] as const;
export const adultSpritesheetSize = [16, 32] as const;
export const faceSpritesheetSize = [32, 32] as const;
