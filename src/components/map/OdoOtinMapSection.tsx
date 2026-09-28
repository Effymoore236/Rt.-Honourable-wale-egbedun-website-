import React from 'react';
import { OdoOtinMap } from './OdoOtinMap';

export const OdoOtinMapSection: React.FC = () => {
  return (
    <section className="py-4 sm:py-6 bg-white overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <OdoOtinMap />
      </div>
    </section>
  );
};
