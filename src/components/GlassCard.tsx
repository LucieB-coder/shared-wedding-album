import type {ReactNode} from "react";

function GlassCard({children}: { children: ReactNode }) {
    return (
        <div className="flex flex-1 w-full flex-col p-4 backdrop-blur-2xl rounded-2xl text-white bg-white/5 border border-gray-500/30">
            {children}
        </div>
    )
}

export default GlassCard;