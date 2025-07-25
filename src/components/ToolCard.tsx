import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

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
        'h-full rounded-lg p-6 transition-all duration-300',
        'bg-white/40 dark:bg-slate-900/40',
        'backdrop-blur-sm',
        'border border-white/50 dark:border-slate-800/50',
        'shadow-md hover:shadow-xl dark:shadow-slate-950/50',
        'group-hover:-translate-y-1 group-hover:border-accent/50'
      )}>
        <div className="flex items-start justify-between">
          <div className="mb-4 inline-block rounded-lg bg-primary/10 p-3 text-primary">
            <Icon className="h-6 w-6" />
          </div>
          {isNew && <Badge variant="outline" className="border-accent text-accent">New</Badge>}
        </div>
        <h3 className="font-headline text-lg font-semibold text-primary">{name}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
    </Link>
  );
}
