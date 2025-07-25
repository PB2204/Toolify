'use client';

import { Button } from '@/components/ui/button';
import { Award, Briefcase, CheckCircle, Heart, Users } from 'lucide-react';

const stats = [
  { value: '2', label: 'Years of Experience', icon: Award },
  { value: '25+', label: 'Project Complete', icon: Briefcase },
  { value: '25', label: 'Happy Clients', icon: Heart },
  { value: '5', label: 'Winning Awards', icon: Award },
];

const features = [
  {
    title: 'Innovative Digital Solutions',
    description: 'Our team brings forward creative digital solutions tailored to fit your business\'s unique needs, ensuring that innovation remains at the core of everything we do.',
  },
  {
    title: 'Data-Driven Approach',
    description: 'Our strategies are driven by data, giving you insights that enhance performance and guarantee growth by aligning each decision with your goals.',
  },
  {
    title: 'Proven Expertise',
    description: 'With a track record of successful projects across sectors, MB Webber’s combines technical expertise with modern industry knowledge to deliver robust solutions.',
  },
  {
    title: 'Collaborative Mindset',
    description: 'We value your input at every stage, fostering a collaborative partnership that allows us to deliver solutions precisely tailored to your vision.',
  },
  {
    title: 'Dedicated Support',
    description: 'Our commitment to customer satisfaction is unwavering. Our support team is ready to assist you, ensuring smooth project implementation, operation and project management.',
  },
  {
    title: 'Future-Ready Vision',
    description: 'We embrace emerging technologies, ensuring your solutions are forward-thinking and prepared for the future of digital transformation.',
  },
];

const services = [
  'Branding', 'Website Design', 'App Design', 'Development', 
  'UI/UX Design', 'Graphic Design', 'Motion Graphic', 'Digital Marketing', 'SEO'
];

const teamMembers = [
    { name: 'John Doe', role: 'Lead Developer' },
    { name: 'Jane Smith', role: 'UI/UX Designer' },
    { name: 'Alex Johnson', role: 'Project Manager' },
];

export default function AboutPage() {
  return (
    <div className="bg-background text-foreground">
      <div className="absolute inset-0 -z-10 h-full w-full bg-background dark:animated-gradient-bg" />
      <div className="absolute inset-0 -z-10 h-full w-full bg-background/80 backdrop-blur-2xl" />

      <main className="container mx-auto px-4 py-16 sm:py-24 space-y-24">
        {/* Hero Section */}
        <section className="text-center">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-foreground dark:animated-gradient-text">
            MB Webber's
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground dark:text-slate-300 max-w-3xl mx-auto">
            A Dynamic Tech Agency Fueled By Deep Passion. Welcome to MB Webber's, where technology and creativity unite to deliver exceptional digital solutions. Our team is dedicated to developing impactful software, websites, and mobile applications that empower businesses.
          </p>
        </section>

        {/* Stats Section */}
        <section>
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl font-semibold text-foreground/90 dark:text-white/90">
                Experiences Fueled by Passion and Expertise
            </h2>
             <p className="mt-4 text-muted-foreground dark:text-slate-300 max-w-2xl mx-auto">
                At our core, we're more than just a creative agency – we're a dynamic team of storytellers, strategists, and tech enthusiasts.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((stat) => (
              <div key={stat.label} className="glow-border rounded-xl p-0.5">
                <div className="bg-card/60 dark:bg-white/5 backdrop-blur-md rounded-lg p-6 h-full flex flex-col items-center justify-center">
                  <stat.icon className="h-10 w-10 mb-4 text-primary" />
                  <p className="text-4xl font-bold text-foreground dark:text-white">{stat.value}</p>
                  <p className="text-muted-foreground dark:text-slate-300">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section>
           <div className="text-center mb-12">
            <h2 className="font-headline text-3xl font-semibold text-foreground/90 dark:text-white/90">
                Why Choose MB Webber's
            </h2>
             <p className="mt-4 text-muted-foreground dark:text-slate-300 max-w-2xl mx-auto">
                We’re not just a tech company; we’re your dedicated partner in achieving digital excellence through innovative solutions and a results-driven approach.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="glow-border rounded-xl p-0.5">
                 <div className="bg-card/60 dark:bg-white/5 backdrop-blur-md rounded-lg p-6 h-full">
                  <CheckCircle className="h-8 w-8 text-primary mb-4" />
                  <h3 className="text-xl font-headline font-semibold mb-2 text-foreground/90 dark:text-white/90">{feature.title}</h3>
                  <p className="text-muted-foreground dark:text-slate-300">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        {/* Services Marquee */}
        <section className="relative overflow-hidden py-8">
            <div className="flex animate-marquee-infinite space-x-8">
                {services.concat(services).map((service, index) => (
                    <div key={index} className="flex-shrink-0 rounded-full bg-primary/10 text-primary font-semibold px-6 py-2 text-lg">
                        {service}
                    </div>
                ))}
            </div>
        </section>


        {/* Technologies Section */}
        <section className="text-center">
            <h2 className="font-headline text-3xl font-semibold text-foreground/90 dark:text-white/90">
                We Are Working With Modern Technologies
            </h2>
             <p className="mt-4 text-muted-foreground dark:text-slate-300 max-w-2xl mx-auto">
                Explore the cutting-edge tools and platforms that power our projects. At MB Webber's, we bring together a blend of innovative technologies to deliver outstanding solutions.
            </p>
        </section>

        {/* Team Section */}
        <section>
             <div className="text-center mb-12">
                <h2 className="font-headline text-3xl font-semibold text-foreground/90 dark:text-white/90">
                    Meet Our Team
                </h2>
                 <p className="mt-4 text-muted-foreground dark:text-slate-300 max-w-2xl mx-auto">
                    Get to know the talented individuals who make our company thrive. Our diverse team brings together a wealth of expertise.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {teamMembers.map(member => (
                    <div key={member.name} className="glow-border rounded-xl p-0.5">
                        <div className="bg-card/60 dark:bg-white/5 backdrop-blur-md rounded-lg p-6 text-center h-full">
                            <div className="w-24 h-24 rounded-full bg-primary/20 mx-auto mb-4 flex items-center justify-center">
                                <Users className="w-12 h-12 text-primary" />
                            </div>
                            <h3 className="text-xl font-headline font-semibold text-foreground/90 dark:text-white/90">{member.name}</h3>
                            <p className="text-primary">{member.role}</p>
                        </div>
                    </div>
                ))}
            </div>
             <div className="text-center mt-12">
                 <Button size="lg" asChild className="group glow-border bg-foreground/10 text-foreground hover:bg-foreground/20 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 backdrop-blur-sm border border-border dark:border-white/20 transition-all duration-300">
                    <a href="https://mbwebbers.tech/team" target="_blank" rel="noopener noreferrer">See More</a>
                </Button>
            </div>
        </section>

        {/* CTA */}
        <section className="text-center bg-primary/10 rounded-lg p-12">
             <h2 className="font-headline text-3xl font-semibold text-foreground/90 dark:text-white/90">
                Get in Touch
            </h2>
             <p className="mt-4 text-muted-foreground dark:text-slate-300 max-w-2xl mx-auto">
               MB WEBBER'S is a forward-thinking software development company specializing in custom tech solutions for businesses of all sizes.
            </p>
            <div className="mt-8">
                <Button size="lg" asChild className="group glow-border bg-foreground/10 text-foreground hover:bg-foreground/20 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 backdrop-blur-sm border border-border dark:border-white/20 transition-all duration-300">
                    <a href="https://mbwebbers.tech/contact" target="_blank" rel="noopener noreferrer">Contact Us</a>
                </Button>
            </div>
        </section>

      </main>
    </div>
  );
}
