import React from 'react';
import { Logo } from '../assets/vector/logo';

import './test-component.scss';

interface Props {
  theme: 'primary' | 'secondary';
}

const TestComponent = ({ theme }: Props) => {
  return (
    <div className={`test-component test-component-${theme}`}>
      <Logo />
      <h1 className="heading">I&apos;m the test component</h1>
    </div>
  );
};

export default TestComponent;
