import React, {FC, ReactNode} from 'react';

import styles from './Button.module.scss';

export enum ButtonVariant {
    primary = 'primary',
    secondary = 'secondary'
}

interface ButtonProps {
    name?: string
    variant?: ButtonVariant
    type?: 'button' | 'submit' | 'reset'
    onClick?: () => void
    disabled?: boolean
    className?: string
    children?: ReactNode
}

const Button: FC<ButtonProps> = (
    {
        name = '',
        variant = ButtonVariant.primary,
        type = 'button',
        onClick,
        disabled = false,
        className= '',
        children
    }) => {
    return (
        <button
            className={`
                ${className}
                ${styles.button}
                ${variant === ButtonVariant.primary ? styles.primary : styles.secondary}           
            `}
            type={type}
            onClick={onClick}
            disabled={disabled}
        >
            {name}
            {children}
        </button>
    );
};

export default Button;