
/**
 * A helper to easily have dynamic classes through objects
 */
export const classNames = classes => Object.keys(classes)
  .filter(klass => classes[klass])
  .join(' ');