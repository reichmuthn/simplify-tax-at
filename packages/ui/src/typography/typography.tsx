import React from "react";

export const D1 = ({
                     className = "",
                     children,
                   }: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (<h1
    className={`font-semibold antialiased text-4xl sm:text-4xl md:text-5xl lg:text-6xl -tracking-[2%] sm:-tracking-[3%] text-display break-words ${className}`}>
    {children}
  </h1>);
}

export const SubHeading = ({
                             className = "",
                             children,
                           }: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (<div
    className={`font-semibold antialiased text-sm md:text-base text-appPrimary uppercase ${className}`}>
    {children}
  </div>);
}

export const H1 = ({
                     className = "",
                     children,
                   }: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (<h1
    className={`font-semibold antialiased text-3xl md:text-4xl lg:text-5xl -tracking-[3%] sm:-tracking-[2%] lg:leading-[58px] text-display ${className}`}>
    {children}
  </h1>);
}

export const H2 = ({
                     className = "",
                     children,
                   }: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (<h2
    className={`font-semibold antialiased text-2xl md:text-3xl lg:text-4xl -tracking-[3%] sm:-tracking-[2%] text-display ${className}`}>
    {children}
  </h2>);
}

export const H3 = ({
                     className = "",
                     children,
                   }: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (<h3
    className={`font-semibold antialiased text-xl md:text-3xl -tracking-[3%] sm:-tracking-[2%]  text-display break-words ${className}`}>
    {children}
  </h3>);
}

export const H4 = ({
                     className = "",
                     children,
  lang
                   }: {
  className?: string;
  children: React.ReactNode;
  lang?: any;
}) => {
  return (<h4
    className={`font-semibold antialiased text-lg md:text-xl -tracking-[2%] text-display ${className}`} lang={lang}>
    {children}
  </h4>);
}

export const H5 = ({
                     className = "",
                     children,
                     lang
                   }: {
  className?: string;
  children: React.ReactNode;
  lang?:any;
}) => {
  return (<h5
    className={`font-semibold antialiased text-base md:text-lg text-display -tracking-[2%] ${className}`} lang={lang}>
    {children}
  </h5>);
}

export const B1 = ({
                     className = "",
                     children,
                   }: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (<p
    className={`font-normal antialiased text-lg md:text-xl text-body tracking-tight ${className}`}>
    {children}
  </p>);
}

export const B2 = ({
                     className = "",
                     children,
                   }: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (<p
    className={`font-normal antialiased text-base md:text-lg text-body tracking-tight ${className}`}>
    {children}
  </p>);
}

export const B3 = ({
                     className = "",
                     children,
  lang
                   }: {
  className?: string;
  children: React.ReactNode;
  lang?: any;
}) => {
  return (<p
    className={`font-normal antialiased text-sm md:text-base text-body tracking-tight ${className}`} lang={lang}>
    {children}
  </p>);
}