import { useEffect, useState } from "react";

const UseDarkMode = () => {
  const [isDark, setIsDark] = useState(() => {
    // Check if running in a browser (avoid SSR issues)
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "dark";
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    console.debug("Toggling dark mode. isDark:", isDark);
    
    // Uncomment the next line to pause execution in the debugger:
    // debugger;

    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
    
    console.debug("Updated HTML classList:", document.documentElement.className);
  }, [isDark]);

  return [isDark, setIsDark];
};

export default UseDarkMode;
