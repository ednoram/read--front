const getPaginationButtonNames = (
  currentPage: number,
  lastPage: number
): string[] => {
  const allButtonNames: string[] = Array.from({ length: lastPage }, (_, i) =>
    String(i + 1)
  );

  const buttonNames: string[] = allButtonNames
    .slice(-3)
    .includes(String(currentPage))
    ? allButtonNames.slice(-5)
    : allButtonNames.slice(
        Math.max(0, currentPage - 3),
        Math.max(currentPage + 2, 5)
      );

  return buttonNames;
};

export default getPaginationButtonNames;
