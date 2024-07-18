export const sameVector = (a, b) => a && b && a.x === b.x && a.y === b.y
export const sumVectors = (a, b) => ({ x: a.x + b.x, y: a.y + b.y });
export const subVectors = (a, b) => ({ x: a.x - b.x, y: a.y - b.y })