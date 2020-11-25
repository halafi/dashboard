// eslint-disable-next-line import/prefer-default-export
export const formatHours = (
  seconds: number,
  units: boolean = true,
  precision: number = 0,
): string => {
  const minutes = seconds / 60;
  const hours = minutes / 60;
  return `${hours.toFixed(precision)}${units ? ' hours' : ''}`;
};

export const getRepositoryName = (input: string): string => {
  const split = input.split('/');
  return split[split.length - 1];
};
