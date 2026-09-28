import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { AboutPreview } from '../components/home/AboutPreview';
import { OdoOtinMapSection } from '../components/map/OdoOtinMapSection';
import { ProjectsCarousel } from '../components/home/ProjectsCarousel';
import { TestimonialsSection } from '../components/home/TestimonialsSection';
import { NewsPreview } from '../components/home/NewsPreview';
import { VolunteerCta } from '../components/home/VolunteerCta';

export const HomePage: React.FC = () => {
  return (
    <div className="w-full">
      <HeroSection />
      <AboutPreview />
      <OdoOtinMapSection />
      <ProjectsCarousel />
      <TestimonialsSection />
      <NewsPreview />
      <VolunteerCta />
    </div>
  );
};
