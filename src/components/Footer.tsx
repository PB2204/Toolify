export function Footer() {
    return (
        <footer className="text-center py-8 border-t bg-transparent text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Toolify. All rights reserved.</p>
            <p>Developed with ❤️ by <a href="https://mbwebbers.tech" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 transition-colors">MB WEBBER'S</a></p>
        </footer>
    );
}
