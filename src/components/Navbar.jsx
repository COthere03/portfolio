import { useEffect, useState, useRef } from "react";
import {
  User,
  Code,
  Briefcase,
  MessageSquare,
  Mail,
  Sun,
  Moon,
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const navItems = [
  /*{ name: "Home", href: "#hero", icon: Home },*/
  { name: "About", href: "#about", icon: User },
  { name: "Skills", href: "#skills", icon: Code },
  { name: "Projects", href: "#projects", icon: Briefcase },
  /*{ name: "Testimonials", href: "#testimonials", icon: MessageSquare },*/
  /*{ name: "Contact", href: "#contact", icon: Mail },*/
];

const ThemeToggle = () => {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    // const stored = localStorage.getItem("theme");
    // if (stored === "dark") {
    //   document.documentElement.classList.add("dark");
    //   setTheme("dark");
    // }
    document.documentElement.classList.add("dark");
    setTheme("dark");
  }, []);

  const toggleTheme = () => {
    // const newTheme = theme === "dark" ? "light" : "dark";
    // document.documentElement.classList.toggle("dark", newTheme === "dark");
    // localStorage.setItem("theme", newTheme);
    // setTheme(newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800"
      title="Toggle theme"
      aria-label="Toggle theme"
    >
      {/* {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />} */}
      <Sun className="w-5 h-5" />
    </button>
  );
};

export const Navbar = () => {
  const [activeSection, setActiveSection] = useState("#hero");
  const [showNavbar, setShowNavbar] = useState(true);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollYRef.current && currentScrollY > 100) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }

      lastScrollYRef.current = currentScrollY;

      const sections = navItems.map((item) => item.href);
      const scrollPosition = currentScrollY + 100;

      for (const section of sections) {
        const element = document.querySelector(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>

      {/* Bottom Navbar */}
      <motion.div
        className={cn(
          "fixed bottom-4 left-1/2 z-50 w-max max-w-[calc(100vw-1rem)] -translate-x-1/2 transform overflow-x-auto",
          "transition-transform duration-300 ease-in-out",
          showNavbar ? "translate-y-0" : "translate-y-full"
        )}
        style={{ willChange: "transform" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex min-w-max items-center justify-center rounded-full border border-gray-200 bg-white/80 p-2 shadow-lg backdrop-blur-md dark:border-gray-700 dark:bg-black/80">
          <div className="flex min-w-max items-center justify-center space-x-1 pl-1 md:pl-2">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={cn(
                  "p-2 rounded-full transition-colors flex flex-col items-center",
                  activeSection === item.href
                    ? "bg-primary text-white"
                    : "text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary"
                )}
                aria-label={item.name}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-xs mt-1 hidden md:block">{item.name}</span>
              </a>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
};