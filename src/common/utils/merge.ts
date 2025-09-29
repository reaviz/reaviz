/**
 * Merges default props with props and returns a new object, filtering out undefined values to keep original behavior.
 * @param defaultProps - The default props to merge.
 * @param props - The props to merge.
 * @returns The merged props.
 */

export const mergeDefaultProps = <T>(
  defaultProps: Partial<T>,
  props: Partial<T> = {}
): T => {
  const filteredProps = Object.fromEntries(
    Object.entries(props).filter(([_, value]) => value !== undefined)
  );
  return { ...defaultProps, ...filteredProps } as T;
};
