import { getToolsByCategory } from '@/lib/tools';
import { ToolCard } from '@/components/ToolCard';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  const toolCategories = getToolsByCategory();
  const featuredTool = 'json-formatter';

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      <div className="absolute inset-0 -z-10 h-full w-full animated-gradient-bg" />
      <div className="absolute inset-0 -z-10 h-full w-full bg-background/80 backdrop-blur-2xl" />

      <div className="container mx-auto px-4">
        <header className="flex justify-between items-center py-6">
          <h1 className="font-headline text-2xl md:text-3xl font-bold text-white">
            <Link href="/">Toolify</Link>
          </h1>
          <ThemeToggle />
        </header>

        <main className="py-20 md:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-transparent bg-clip-text animated-gradient-text">
              The Ultimate Developer Toolkit
            </h2>
            <p className="mt-6 text-lg md:text-xl text-slate-300">
              Your one-stop shop for 60+ essential developer, designer, and content tools. Streamline your workflow with our powerful and easy-to-use utilities, all with a modern, beautiful UI.
            </p>
            <div className="mt-8">
              <Button asChild size="lg" className="group glow-border bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm border border-white/20 transition-all duration-300">
                <Link href={`/${featuredTool}`}>
                  Try our JSON Formatter <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="mt-24">
            {toolCategories.map((category) => (
              <section key={category.name} className="mb-16">
                <h3 className="font-headline text-3xl font-semibold mb-8 text-white/90">
                  {category.name}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {category.tools.map((tool) => (
                    <ToolCard
                      key={tool.slug}
                      href={`/${tool.slug}`}
                      name={tool.name}
                      description={tool.description}
                      icon={tool.icon}
                      isNew={tool.isNew}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
