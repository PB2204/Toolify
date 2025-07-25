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
        'glow-border h-full rounded-lg p-6 transition-all duration-300',
        'bg-white/5 backdrop-blur-md',
        'border border-white/10',
        'shadow-2xl shadow-black/20',
        'hover:bg-white/10 hover:border-white/20',
        'group-hover:-translate-y-1 group-hover:shadow-pink-500/10',
        'flex flex-col'
      )}>
        <div className="flex items-start justify-between">
          <div className="mb-4 inline-block rounded-lg bg-white/10 p-3 text-pink-400 group-hover:text-pink-300 transition-colors">
            <Icon className="h-6 w-6" />
          </div>
          {isNew && <Badge variant="outline" className="border-pink-500 text-pink-400">New</Badge>}
        </div>
        <h3 className="font-headline text-lg font-semibold text-slate-100">{name}</h3>
        <p className="mt-1 text-sm text-slate-400 flex-grow">{description}</p>
      </div>
    </Link>
  );
}
