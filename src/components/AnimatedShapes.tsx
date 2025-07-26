export function AnimatedShapes() {
    return (
        <div className="fixed top-0 left-0 w-full h-full -z-20 overflow-hidden">
            <div className="absolute top-[10vh] left-[10vw] w-48 h-48 bg-primary/30 rounded-full filter blur-2xl opacity-70 animate-[animate-shape_30s_ease-in-out_infinite_alternate]"></div>
            <div className="absolute top-[40vh] right-[5vw] w-64 h-64 bg-secondary/30 rounded-full filter blur-3xl opacity-60 animate-[animate-shape_40s_ease-in-out_infinite_alternate_reverse]"></div>
            <div className="absolute bottom-[5vh] left-[20vw] w-40 h-40 bg-accent/20 rounded-full filter blur-2xl opacity-50 animate-[animate-shape_35s_ease-in-out_infinite_alternate]"></div>
             <div className="absolute bottom-[25vh] right-[25vw] w-32 h-32 bg-primary/20 rounded-full filter blur-xl opacity-60 animate-[animate-shape_25s_ease-in-out_infinite_alternate_reverse]"></div>
        </div>
    )
}
