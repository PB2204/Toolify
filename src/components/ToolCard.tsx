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
        'h-full rounded-2xl p-6 transition-all duration-300 ease-in-out',
        'border border-white/10 bg-white/5 shadow-lg backdrop-blur-lg', // Glassmorphism base
        'dark:border-white/10 dark:bg-white/5 dark:shadow-black/20',
        'hover:scale-[1.03] hover:shadow-2xl dark:hover:shadow-[0_0_12px_#5F9DF7,0_0_24px_#E662A7]',
        'flex flex-col'
      )}>
        <div className="flex items-start justify-between">
          <div className="mb-4 inline-block rounded-lg bg-primary/10 p-3 text-primary transition-colors group-hover:bg-primary/20">
            <Icon className="h-6 w-6" />
          </div>
          {isNew && <Badge variant="outline" className="border-pink-500 text-pink-400">New</Badge>}
        </div>
        <h3 className="font-headline text-lg font-semibold text-foreground flex-grow">{name}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        <div className="mt-4 flex justify-end items-center text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
           <span className="text-sm font-semibold">Use Tool</span>
           <ArrowRight className="ml-2 h-4 w-4" />
        </div>
      </div>
    </Link>
  );
}
