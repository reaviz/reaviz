import { Children, ReactElement, ReactNode } from 'react';

export const getChildComponent = <T extends ReactElement<any, any>>(
  children: ReactNode | ReactNode[],
  componentName: string,
  defaultComponent?: T
): T | undefined => {
  const childrenArray = Children.toArray(children);
  return (
    (childrenArray.find((child) => {
      if (
        typeof child === 'object' &&
        'type' in child &&
        typeof child.type === 'function' &&
        (child.type?.name === componentName ||
          (child.type as any)?.displayName === componentName)
      ) {
        return child;
      }
    }) as T | undefined) ?? defaultComponent
  );
};

export const hasChildComponent = (
  children: ReactNode | ReactNode[],
  componentName: string
): boolean => {
  return Children.toArray(children).some(
    (child: any) => child.type?.name === componentName
  );
};
