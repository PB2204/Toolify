import { notFound } from 'next/navigation';
import { getToolBySlug } from '@/lib/tools';
import toolComponents from '@/components/tools';
import ComingSoon from '@/components/tools/ComingSoon';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Metadata } from 'next';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tool = getToolBySlug(params.slug);

  if (!tool) {
    return {
      title: 'Tool Not Found',
    };
  }

  return {
    title: `${tool.name} | Toolify`,
    description: tool.description,
  };
}

export default function ToolPage({ params }: { params: { slug: string } }) {
  const tool = getToolBySlug(params.slug);

  if (!tool) {
    notFound();
  }

  const ToolComponent = toolComponents[tool.slug] || ComingSoon;

  return (
    <div className="flex flex-col h-full">
      <header className="flex items-center gap-4 p-4 border-b bg-background/80 backdrop-blur-sm sticky top-0 z-10">
        <SidebarTrigger className="md:hidden" />
        <h1 className="text-xl font-headline font-semibold">{tool.name}</h1>
      </header>
      <main className="flex-1 p-4 md:p-6 overflow-y-auto">
        <ToolComponent />
      </main>
    </div>
  );
}
