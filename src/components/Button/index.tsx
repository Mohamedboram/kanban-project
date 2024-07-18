// @ts-ignore

import {ReactNode} from 'react';
import "./style.css"

interface ButtonProps {
  [key: string]: ReactNode | string | number | boolean | undefined | (() => void);

  text: ReactNode | string;
  onClick: () => void;
  type: 'primary' | 'secondary' | 'destructive' | '';
}

const Button = ({text, onClick, type, ...rest}: ButtonProps) => {
  return (
    <button onClick={onClick} className={`button ${type} ${rest.hasIcon ? "has-icon" : ""} ${rest.size}`} {...rest}>
      {text}
    </button>
  );
};

export default Button;
