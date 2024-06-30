 import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { LandingNavbar } from '@/components/landing-navbar';
import { LandingHero } from '@/components/LandingHero';
import { LandingContent } from '@/components/landing-content';

const LandingPage = ()=> {
  return (
    <div className='h-full'>
      <LandingNavbar />
      <LandingHero />
      <LandingContent/>
    </div>
   
  );
}

export default LandingPage;
