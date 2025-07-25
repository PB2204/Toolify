export function Footer() {
    return (
        <footer className="text-center py-8 border-t border-slate-800 bg-transparent text-slate-400">
            <p>&copy; {new Date().getFullYear()} Toolify. All rights reserved.</p>
            <p>Developed with ❤️ by <a href="https://mbwebbers.tech" target="_blank" rel="noopener noreferrer" className="text-pink-400 hover:text-pink-500 transition-colors">MB WEBBER'S</a></p>
        </footer>
    );
}
