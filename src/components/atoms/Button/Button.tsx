import { PropsWithChildren, ReactElement } from 'react';
import Loading from '../Loading/Loading';
import './Button.scss';

export interface ButtonProps {
  primary: boolean;
  disabled?: boolean;
  loading?: boolean;
  submit?: boolean;
  onClick?: () => void;
  children: string | ReactElement;
}

const Button: React.FC<ButtonProps> = ({
  primary, disabled, loading, onClick, submit, children,
}: PropsWithChildren<ButtonProps>) => {
  const executeAction = () => {
    if (!disabled && !loading && onClick) {
      onClick();
    }
  };

  return (
    <button
      type={submit ? 'submit' : 'button'}
      className={disabled
        ? 'Button__Disabled'
        : `Button__${primary ? 'Button--primary' : 'Button--secondary'}`}
      onClick={executeAction}
    >
      {loading ? <Loading /> : children}
    </button>
  );
};

export default Button;
