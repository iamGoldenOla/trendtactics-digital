import Link from "next/link";
import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "outline";
  size?: "large" | "small";
  className?: string;
  [key: string]: unknown;
}

// Add gtag type to window
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export default function Button({
  children,
  href,
  variant = "primary",
  size = "large",
  className = "",
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-semibold rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400";
  const variants = {
    primary: "bg-cyan-400 text-[#0A1E3F] hover:bg-cyan-500",
    outline: "border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-[#0A1E3F]",
  };
  const sizes = {
    large: "px-6 py-3 text-base",
    small: "px-4 py-2 text-sm",
  };
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  // Analytics event handler
  const handleAnalytics = (e: React.MouseEvent) => {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', 'cta_click', {
        event_category: 'CTA/Button',
        event_label: typeof children === 'string' ? children : '',
        variant,
        page_location: window.location.pathname
      });
    }
    if (typeof props.onClick === 'function') {
      props.onClick(e);
    }
  };

  if (href) {
    return (
      <Link href={href} className={classes} {...props} onClick={handleAnalytics}>
        {children}
      </Link>
    );
  }
  return (
    <button className={classes} {...props} onClick={handleAnalytics}>
      {children}
    </button>
  );
} 