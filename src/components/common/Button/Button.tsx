import React from 'react';

const Button = ( { title, onClick }: ButtonPropsType ) => {
  return (
    <button onClick={onClick}>{ title }</button>
  );
};

export default Button;

type ButtonPropsType = {
  title: string
  onClick: () => void
}