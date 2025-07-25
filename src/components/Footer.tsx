export function Footer() {
    return (
        <footer className="text-center py-6 border-t bg-background">
            <p className="text-muted-foreground">&copy; {new Date().getFullYear()} Toolify. All rights reserved. || Developed with ❤️ :: By <a href="https://mbwebbers.tech" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">MB WEBBER'S</a></p>
        </footer>
    );
}
