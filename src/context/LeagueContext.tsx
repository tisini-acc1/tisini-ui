import { createContext, ReactNode, useContext, useState } from "react";

interface LeagueContextType {
  season: string;
  setSeason: (season: string) => void;
}

const LeagueContext = createContext<LeagueContextType | undefined>(undefined);

export const LeagueProvider = ({ children }: { children: ReactNode }) => {
  const [season, setSeason] = useState("");

  return (
    <LeagueContext.Provider value={{ season, setSeason }}>
      {children}
    </LeagueContext.Provider>
  );
};

export const useLeague = () => {
  const context = useContext(LeagueContext);

  if (!context) {
    throw new Error("useLeague must be used within a LeagueProvider");
  }

  return context;
};
