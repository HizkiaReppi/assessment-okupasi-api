export function removeDuplicate(arrObj?: {id: string}[]): {id: string}[] {
  return !arrObj ? [] : arrObj.filter((obj, i, self) =>
    i === self.findIndex((t) => t.id === obj.id),
  );
}
