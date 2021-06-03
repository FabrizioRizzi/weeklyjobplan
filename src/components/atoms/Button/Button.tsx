import { PropsWithChildren } from 'react';
import Loading from '../Loading/Loading';
import './Button.scss';

export interface ButtonProps {
  primary: boolean;
  disabled?: boolean;
  loading?: boolean;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({
  primary, disabled, loading, onClick, children,
}: PropsWithChildren<ButtonProps>) => {
  const executeAction = () => {
    if (!disabled && !loading) {
      onClick();
    }
  };

  return (
    <div
      className={disabled
        ? 'Button__Disabled'
        : `Button__${primary ? 'Button--primary' : 'Button--secondary'}`}
      onClick={executeAction}
    >
      {loading ? <Loading /> : children}
    </div>
  );
};

export default Button;
