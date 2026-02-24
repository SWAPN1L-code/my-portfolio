import React from 'react';
import { Card, CardContent } from './card';
import { cn } from '../../lib/utils';

export const SpotifyWidget = ({ className, isDarkMode }) => {
    return (
        <Card className={cn(
            "overflow-hidden transition-all border-slate-200 dark:border-slate-800 glass-morphism group hover:shadow-[0_0_20px_rgba(29,185,84,0.15)]",
            className
        )}>
            <CardContent className="p-4 flex items-center gap-4">
                {/* Album Art Placeholder */}
                <div className="relative w-16 h-16 rounded-md overflow-hidden shrink-0 shadow-md">
                    <img
                        src="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=200&auto=format&fit=crop"
                        alt="Album Art"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Play Overlay */}
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-play"><polygon points="6 3 20 12 6 21 6 3" /></svg>
                    </div>
                </div>

                {/* Track Info */}
                <div className="flex-1 min-w-0 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#1DB954]"><circle cx="12" cy="12" r="10" /><path d="M8 11.973c2.5-1.473 5.5-.973 7.5.527" /><path d="M9 15c1.5-1 4-1 5 .5" /><path d="M7 9c2-1 6-2 10 .5" /></svg>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#1DB954]">Currently Playing</span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 truncate group-hover:text-[#1DB954] transition-colors">
                        Nights
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                        Frank Ocean
                    </p>
                </div>

                {/* Audio Visualizer Animation */}
                <div className="flex items-end gap-[2px] h-4 shrink-0 px-2">
                    {[1, 2, 3, 4].map((i) => (
                        <div
                            key={i}
                            className="w-1 bg-[#1DB954] rounded-t-sm"
                            style={{
                                height: ['40%', '80%', '60%', '100%'][i - 1],
                                animation: `bounce ${0.8 + (i * 0.1)}s ease-in-out infinite alternate`,
                                animationDelay: `${i * 0.15}s`
                            }}
                        />
                    ))}
                </div>
            </CardContent>

            <style jsx>{`
        @keyframes bounce {
          0% { height: 20%; }
          100% { height: 100%; }
        }
      `}</style>
        </Card>
    );
};
