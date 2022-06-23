import React from 'react';

const Button = ( { title }: ButtonPropsType ) => {
  return (
    <button>{ title }</button>
  );
};

export default Button;

type ButtonPropsType = {
  title: string
}