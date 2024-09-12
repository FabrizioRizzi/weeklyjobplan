import React from "react";
import { PropsWithChildren } from "react";
import Loading from "../Loading/Loading";
import "./Button.scss";

export interface ButtonProps extends PropsWithChildren {
  primary: boolean;
  disabled?: boolean;
  loading?: boolean;
  submit?: boolean;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  primary,
  disabled,
  loading,
  onClick,
  submit,
  children,
}: ButtonProps) => {
  const executeAction = () => {
    if (!disabled && !loading && onClick) {
      onClick();
    }
  };

  return (
    <button
      data-testid="button"
      type={submit ? "submit" : "button"}
      className={
        disabled
          ? "Button__Disabled"
          : `Button__${primary ? "Button--primary" : "Button--secondary"}`
      }
      onClick={executeAction}
    >
      {loading ? <Loading /> : children}
    </button>
  );
};

export default Button;
