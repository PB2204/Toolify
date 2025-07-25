import { Metadata } from 'next';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Contact Us | Toolify',
  description: 'Get in touch with the team at MB Webber\'s.',
};

export default function ContactPage() {
  return (
    <div className="bg-background text-foreground">
      <div className="absolute inset-0 -z-10 h-full w-full bg-background dark:animated-gradient-bg" />
      <div className="absolute inset-0 -z-10 h-full w-full bg-background/80 backdrop-blur-2xl" />

      <main className="container mx-auto px-4 py-16 sm:py-24">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-foreground dark:animated-gradient-text">
            Contact Us
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground dark:text-slate-300">
            Have a question, a feature request, or just want to say hello? We'd love to hear from you.
          </p>
           <div className="mt-8">
                <Button size="lg" asChild className="group glow-border bg-foreground/10 text-foreground hover:bg-foreground/20 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 backdrop-blur-sm border border-border dark:border-white/20 transition-all duration-300">
                    <a href="https://mbwebbers.tech/contact" target="_blank" rel="noopener noreferrer">Contact Us</a>
                </Button>
            </div>
        </div>
      </main>
    </div>
  );
}
