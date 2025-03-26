import { mergeDefaultProps } from './merge';
import * as MODULES from '..';

const pascalToSnakeUpper = (str: string): string =>
  str
    .replace(/([A-Z])/g, '_$1')
    .replace(/^_/, '')
    .toUpperCase();

/**
 * Get the default props for a component by name.
 * @param componentName - The name of the component.
 * @param props - The props to merge with the default props.
 * @returns The merged props.
 */
export const useDefaultProps = <T extends any>(
  componentName: string,
  props: Partial<T>
): Partial<T> | undefined => {
  if (!componentName) {
    return undefined;
  }

  const constName = `${pascalToSnakeUpper(componentName)}_DEFAULT_PROPS`;
  const defaultProps = MODULES[constName] || {};

  return mergeDefaultProps(defaultProps, props);
};
