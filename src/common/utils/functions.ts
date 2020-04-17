import classNames from 'classnames';

export interface PropFunctionTypes {
  /**
   * Classnames to apply to the element.
   */
  className?: any;

  /**
   * CSS styles to apply to the element.
   */
  style?: any;
}

export const functionProps = (prop: string, val: any, data: any) => {
  if (typeof val === 'function') {
    return val(data);
  } else if (prop === 'className') {
    return classNames(val);
  } else if (val !== undefined || val !== null) {
    return val;
  }

  return {};
};

export const constructFunctionProps = (
  props: PropFunctionTypes,
  data: any
) => ({
  className: functionProps('className', props.className, data),
  style: functionProps('style', props.style, data)
});
