import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

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
            Have a question, a feature request, or just want to say hello? We'd love to hear from you. Fill out the form below and we'll get back to you as soon as possible.
          </p>
        </div>

        <div className="max-w-xl mx-auto">
          <div className="glow-border rounded-xl">
             <div className="rounded-lg p-8 md:p-12 space-y-6 bg-card/60 dark:bg-white/5 backdrop-blur-md">
                <form action="#" className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First Name</Label>
                      <Input id="first-name" placeholder="John" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last Name</Label>
                      <Input id="last-name" placeholder="Doe" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="john.doe@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" placeholder="Your message here..." rows={5} />
                  </div>
                  <div className="text-right">
                    <Button type="submit" size="lg" className="w-full sm:w-auto">
                      Send Message
                    </Button>
                  </div>
                </form>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
}
