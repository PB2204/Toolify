import Link from 'next/link';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Button } from './ui/button';

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-lg">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold sm:inline-block font-headline text-xl text-glow">Toolify</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
           <div className="hidden md:flex items-center gap-4">
               <Button variant="ghost" asChild>
                    <Link href="/about">About Us</Link>
               </Button>
               <Button variant="ghost" asChild>
                    <a href="https://mbwebbers.tech/contact" target="_blank" rel="noopener noreferrer">Contact</a>
               </Button>
           </div>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
