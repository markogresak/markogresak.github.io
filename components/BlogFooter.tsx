import React from 'react';
import { NAME } from '../lib/constants';
import AboutMe from './AboutMe';

export const Footer = () => {
  return (
    <div className="border-t-2 border-blue-700 dark:border-purple-400 pt-10 mt-10">
      <AboutMe name={NAME} href="/" />
    </div>
  );
};
