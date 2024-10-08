import React from "react";


export function SectionFull({className = "", children}: {
    className?: string;
    children?: React.ReactNode
}) {
    return (
        <section className={`bg-surface-2 ${className}`}>
            <div className="mx-auto max-w-7xl space-y-12 py-0 md:py-20 lg:py-24 lg:space-y-20 px-0 sm:px-6 md:px-8">
                {children}
            </div>
        </section>
    );
}
