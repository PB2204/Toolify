import { getToolsByCategory } from '@/lib/tools';
import { ToolCard } from '@/components/ToolCard';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  const toolCategories = getToolsByCategory();
  const featuredTool = 'paraphraser';

  return (
    <div className="container mx-auto px-4 py-12">
      <header className="text-center mb-16">
        <h1 className="font-headline text-5xl md:text-7xl font-bold text-primary">
          Toolify
        </h1>
        <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Your one-stop shop for 60+ essential developer, designer, and content tools. Streamline your workflow with our powerful and easy-to-use utilities.
        </p>
        <div className="mt-8">
          <Button asChild size="lg">
            <Link href={`/${featuredTool}`}>Try our new AI Paraphraser</Link>
          </Button>
        </div>
      </header>

      <main>
        {toolCategories.map((category) => (
          <section key={category.name} className="mb-12">
            <h2 className="font-headline text-3xl font-semibold mb-6 border-b-2 border-primary/20 pb-2 text-primary">
              {category.name}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {category.tools.map((tool) => (
                <ToolCard
                  key={tool.slug}
                  href={`/${tool.slug}`}
                  name={tool.name}
                  description={tool.description}
                  icon={tool.icon}
                  isNew={tool.slug === featuredTool}
                />
              ))}
            </div>
          </section>
        ))}
      </main>
      
      <footer className="text-center mt-20 py-6 border-t">
        <p className="text-muted-foreground">&copy; {new Date().getFullYear()} Toolify. All rights reserved.</p>
      </footer>
    </div>
  );
}
