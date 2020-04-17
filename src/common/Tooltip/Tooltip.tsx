import React, { FC, useState, useRef, useEffect, useCallback } from 'react';
import classNames from 'classnames';
import {
  Placement,
  ReferenceObject,
  ConnectedOverlay,
  TriggerTypes
} from 'rdk';
import css from './Tooltip.module.scss';
import { motion } from 'framer-motion';

const tooltips: ((setter: boolean) => void)[] = [];

export interface TooltipProps {
  /**
   * Content for the tooltip.
   */
  content: any;

  /**
   * Reference of the tooltip to align to.
   */
  reference?: ReferenceObject | HTMLElement | any;

  /**
   * Popperjs placement.
   */
  placement: Placement;

  /**
   * Delay before showing tooltip.
   */
  enterDelay: number;

  /**
   * Delay before closing tooltip.
   */
  leaveDelay: number;

  /**
   * Popperjs modifiers.
   */
  modifiers?: any;

  /**
   * External setter for visibility.
   */
  visible: boolean;

  /**
   * Additiona CSS classnames.
   */
  className?: any;

  /**
   * How the tooltip will be triggered.
   */
  trigger: TriggerTypes[] | TriggerTypes;

  /**
   * Whether the tooltip is disabled.
   */
  disabled?: boolean;

  /**
   * Whether the tooltip should move with the cursor or not.
   */
  followCursor?: boolean;
}

export const Tooltip: FC<Partial<TooltipProps>> = ({
  className,
  children,
  content,
  disabled = false,
  enterDelay = 0,
  leaveDelay = 200,
  placement = 'top',
  trigger = 'hover',
  visible = false,
  followCursor = false,
  ...rest
}) => {
  const [internalVisible, setInternalVisible] = useState<boolean>(visible);
  const timeout = useRef<any>();
  const mounted = useRef<boolean>();
  const ref = useRef<(setter: boolean) => void>(setInternalVisible);

  useEffect(() => {
    // componentDidUpdateLogic style logic
    if (!mounted.current) {
      mounted.current = true;
    } else {
      setInternalVisible(visible);
    }

    return () => {
      clearTimeout(timeout.current);
      deactivate();
    };
  }, [visible]);

  const deactivateAll = useCallback(
    () =>
      tooltips.forEach((r, i) => {
        r(false);
        tooltips.splice(i, 1);
      }),
    []
  );

  const deactivate = useCallback(() => {
    const idx = tooltips.indexOf(ref.current);
    if (idx > -1) {
      setInternalVisible(false);
      tooltips.splice(idx, 1);
    }
  }, []);

  return (
    <ConnectedOverlay
      {...rest}
      placement={placement}
      trigger={trigger}
      followCursor={followCursor}
      open={internalVisible}
      content={() => {
        const contentChildren =
          typeof content === 'function' ? content() : content;

        if (!contentChildren) {
          return null;
        }

        return (
          <motion.div
            className={classNames(css.tooltip, className)}
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.3 }}
          >
            {contentChildren}
          </motion.div>
        );
      }}
      onActivate={() => {
        if (!internalVisible) {
          deactivateAll();
          clearTimeout(timeout.current);
          timeout.current = setTimeout(() => {
            if (!disabled) {
              setInternalVisible(true);
              tooltips.push(ref.current);
            }
          }, enterDelay);
        }
      }}
      onDeactivate={() => {
        clearTimeout(timeout.current);
        timeout.current = setTimeout(() => deactivate(), leaveDelay);
      }}
    >
      {children}
    </ConnectedOverlay>
  );
};
