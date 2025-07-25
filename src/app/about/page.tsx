import { Metadata } from 'next';
import Image from 'next/image';
import { CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us | Toolify',
  description: 'Learn more about MB Webber\'s, the team behind Toolify.',
};

const features = [
  'Innovative Web Solutions',
  'User-Centric Design',
  'Cutting-Edge Technology',
  'Reliable and Scalable Products',
];

export default function AboutPage() {
  return (
    <div className="bg-background text-foreground">
      <div className="absolute inset-0 -z-10 h-full w-full bg-background dark:animated-gradient-bg" />
      <div className="absolute inset-0 -z-10 h-full w-full bg-background/80 backdrop-blur-2xl" />

      <main className="container mx-auto px-4 py-16 sm:py-24">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-foreground dark:animated-gradient-text">
            About MB WEBBER'S
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground dark:text-slate-300 max-w-3xl mx-auto">
            We are a passionate team of developers and designers dedicated to creating tools that are powerful, beautiful, and easy to use. Toolify is our commitment to the developer community.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="font-headline text-3xl font-semibold mb-6 text-foreground/90 dark:text-white/90">
              Our Philosophy
            </h2>
            <p className="text-muted-foreground dark:text-slate-300 mb-6">
              At MB Webber's, we believe that great tools empower great creators. Our mission is to streamline workflows and solve common problems with elegant software. We focus on clean code, intuitive interfaces, and robust performance to deliver products that developers and designers love to use every day.
            </p>
            <ul className="space-y-4">
              {features.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <CheckCircle className="h-6 w-6 text-primary" />
                  <span className="text-foreground dark:text-slate-200">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="order-1 lg:order-2">
             <div className="glow-border rounded-xl">
              <Image
                src="https://placehold.co/800x600.png"
                alt="MB Webber's Team"
                width={800}
                height={600}
                className="rounded-lg object-cover w-full h-full"
                data-ai-hint="team collaboration"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
