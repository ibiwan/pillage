export const MED_NAMES_KEY = 'medNames';

export const getMedNames = (state) => {
  const {
    medList: { medNames },
  } = state;
  console.log({ state });

  return medNames ?? [];
};
