import {type HTMLAttributes, memo, type ReactNode} from 'react';
import classNames from 'classnames';
import styles from './styles.module.css';

interface TooltipItemProps extends HTMLAttributes<HTMLDivElement> {
    size?: number;
    color: string;
    children: ReactNode;
}

export const TooltipItem = memo(function TooltipItem(props: TooltipItemProps) {
    const {size = 8, color, children, className, ...other} = props;
    const radius = size / 2;

    return (
        <div className={classNames(className, styles.item)} {...other}>
            <svg width={size} height={size}>
                <circle fill={color} r={radius} cx={radius} cy={radius} />
            </svg>
            <div>{children}</div>
        </div>
    );
});
