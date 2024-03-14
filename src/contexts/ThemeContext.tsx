import { createContext, useState, ReactNode } from 'react';

type ThemeContextType = {
  theme: string;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);



export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<string>('light');

  const toggleTheme = () => {
    setTheme((curr) => (curr === 'light' ? 'dark' : 'light'))
  }

  const rootClass = theme === 'dark' ? 'dark' : '';

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={rootClass}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export { ThemeContext }

