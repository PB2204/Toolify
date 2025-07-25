import Link from 'next/link';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Button } from './ui/button';

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block font-headline text-xl">Toolify</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
           <div className="hidden md:flex items-center gap-4">
               <Button variant="ghost" asChild>
                    <Link href="/about">About Us</Link>
               </Button>
               <Button variant="ghost" asChild>
                    <Link href="/contact">Contact</Link>
               </Button>
           </div>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
