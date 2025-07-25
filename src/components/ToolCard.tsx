import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';

interface ToolCardProps {
  name: string;
  description: string;
  icon: LucideIcon;
  href: string;
  isNew?: boolean;
}

export function ToolCard({ name, description, icon: Icon, href, isNew }: ToolCardProps) {
  return (
    <Link href={href} className="group block" prefetch={false}>
      <div className={cn(
        'glow-border h-full rounded-lg p-6 transition-all duration-300',
        'bg-card shadow-lg dark:border-white/10 dark:bg-white/5 dark:shadow-black/20 dark:backdrop-blur-md',
        'hover:bg-card/60 dark:hover:bg-white/10 dark:hover:border-pink-500/50',
        'group-hover:-translate-y-1 group-hover:shadow-pink-500/10',
        'flex flex-col'
      )}>
        <div className="flex items-start justify-between">
          <div className="mb-4 inline-block rounded-lg bg-primary/10 p-3 text-primary transition-colors group-hover:bg-primary/20">
            <Icon className="h-6 w-6" />
          </div>
          {isNew && <Badge variant="outline" className="border-pink-500 text-pink-400">New</Badge>}
        </div>
        <h3 className="font-headline text-lg font-semibold text-foreground flex-grow">{name}</h3>
        <p className="mt-1 text-sm text-muted-foreground ">{description}</p>
        <div className="mt-4 flex justify-end items-center text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
           <span className="text-sm font-semibold">Use Tool</span>
           <ArrowRight className="ml-2 h-4 w-4" />
        </div>
      </div>
    </Link>
  );
}
