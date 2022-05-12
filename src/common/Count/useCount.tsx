import { animate } from 'framer-motion';
import { useEffect, useRef } from 'react';

export interface CountInputs {
  /**
   * Number to animate to
   */
  to: number;

  /**
   * Number to animate from. Defaults 0.
   */
  from?: number;

  /**
   * Duration of the animation in seconds. Defaults 1.
   */
  duration?: number;

  /**
   * Delay of the animation. Defaults 0.
   */
  delay?: number;

  /**
   * Localize the number. Defaults true.
   */
  format?: boolean;

  /**
   * Number of decimal places. Defaults 0.
   */
  decimalPlaces?: number;
}

export const COUNT_DEFAULTS = {
  from: 0,
  duration: 1,
  delay: 0,
  format: true,
  decimalPlaces: 0
};

export const useCount = ({
  from,
  to,
  duration,
  delay,
  decimalPlaces,
  format
}: CountInputs) => {
  const nodeRef = useRef<any | null>(null);

  from = from || COUNT_DEFAULTS.from;
  duration = duration || COUNT_DEFAULTS.duration;
  delay = delay || COUNT_DEFAULTS.delay;
  format = format || COUNT_DEFAULTS.format;
  decimalPlaces = decimalPlaces || COUNT_DEFAULTS.decimalPlaces;

  useEffect(() => {
    const node = nodeRef.current;

    const controls = animate(from, to, {
      duration,
      delay,
      onUpdate(value) {
        let formatted: number | string = value;
        if (decimalPlaces) {
          formatted = Number(value.toFixed(decimalPlaces));
        } else {
          formatted = Number(value.toFixed(0));
        }

        if (format) {
          formatted = formatted.toLocaleString();
        }

        node.textContent = formatted as string;
      }
    });

    return () => controls.stop();
  }, [from, to, duration, delay, decimalPlaces, format]);

  return nodeRef;
};
