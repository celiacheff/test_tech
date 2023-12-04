export const DateGenerator = (date?: Date) => {
  return {
    now: () => date || new Date(),
  }
}

export type DateGenerator = ReturnType<typeof DateGenerator>;

