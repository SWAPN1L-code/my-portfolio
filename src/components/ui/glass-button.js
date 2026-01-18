import React, { useCallback, useState } from "react"
import { Button } from "./button"
import { cn } from "../../lib/utils"

export function GlassButton({
    children,
    name = "Glass Button",
    className,
    isDarkMode,
    asChild = false,
    ...props
}) {
    const [cracked, setCracked] = useState(false)
    const [animating, setAnimating] = useState(false)

    // Detect internal dark mode if not provided
    const darkMode = isDarkMode !== undefined ? isDarkMode : document.documentElement.classList.contains('dark')

    const handleClick = useCallback((e) => {
        if (darkMode) {
            setCracked(true)
            setTimeout(() => setCracked(false), 2000)
        } else {
            setAnimating(true)
            setTimeout(() => setAnimating(false), 1000)
        }
        if (props.onClick) props.onClick(e)
    }, [darkMode, props.onClick])

    return (
        <div className={cn("relative inline-block", asChild ? "w-full" : "")}>
            <Button
                {...props}
                asChild={asChild}
                onClick={handleClick}
                className={cn(
                    "relative overflow-hidden transition-all duration-300 ease-in-out font-semibold px-6 py-3 rounded-xl",
                    "hover:scale-105 active:scale-95 group",
                    darkMode
                        ? "bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg text-white hover:bg-white/20"
                        : "bg-blue-500/10 backdrop-blur-md border border-blue-500/20 shadow-md text-blue-600 hover:bg-blue-500/20",
                    animating && !darkMode && "animate-pulse",
                    className
                )}
            >
                {asChild ? (
                    children
                ) : (
                    <>
                        {/* Normal animation glaze effect for light mode */}
                        {!darkMode && (
                            <div className={cn(
                                "absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full transition-transform duration-1000",
                                animating ? "translate-x-full" : ""
                            )} />
                        )}

                        {/* Glaze effect for dark mode (always active on hover via CSS) */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full transition-transform duration-1000 group-hover:translate-x-full" />

                        <span className="relative z-10">{children || name}</span>

                        {cracked && darkMode && (
                            <svg
                                className="absolute inset-0 w-full h-full pointer-events-none z-20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <defs>
                                    <radialGradient
                                        id="crack-gradient"
                                        cx="50%"
                                        cy="50%"
                                        r="50%"
                                        fx="50%"
                                        fy="50%"
                                    >
                                        <stop offset="0%" stopColor="rgba(255,255,255,0.8)" />
                                        <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                                    </radialGradient>
                                </defs>
                                {Array.from({ length: 50 }).map((_, i) => (
                                    <path
                                        key={i}
                                        d={`M${50 + Math.random() * 50},${50 + Math.random() * 50} 
                           Q${Math.random() * 100},${Math.random() * 100} 
                            ${Math.random() * 100},${Math.random() * 100}
                           T${Math.random() * 100},${Math.random() * 100}`}
                                        stroke="url(#crack-gradient)"
                                        strokeWidth={Math.random() * 2 + 0.5}
                                        fill="none"
                                        className="crack-line"
                                        style={{
                                            animationDelay: `${Math.random() * 0.5}s`,
                                            opacity: Math.random() * 0.5 + 0.5,
                                        }}
                                    />
                                ))}
                            </svg>
                        )}
                    </>
                )}
            </Button>
        </div>
    )
}
