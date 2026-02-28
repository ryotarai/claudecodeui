import React from 'react';
import { withBasePath } from '../utils/basePath';

const GeminiLogo = ({className = 'w-5 h-5'}) => {
  return (
    <img src={withBasePath('/icons/gemini-ai-icon.svg')} alt="Gemini" className={className} />
  );
};

export default GeminiLogo;
