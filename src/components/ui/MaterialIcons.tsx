"use client";

import { useEffect } from "react";

interface MaterialIconProps extends React.HTMLAttributes<HTMLSpanElement> {
  name: string;
}

export default function MaterialIcon({ name, className, ...props }: MaterialIconProps) {
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/icon?family=Material+Icons";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <span className={`material-icons ${className || ""}`} {...props}>
      {name}
    </span>
  );
}