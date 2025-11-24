import { createContext, useState, useEffect, useContext } from "react";
import { account } from "../lib/appwrite";

const UserContext = createContext();

// custom hook — call inside components only
export const useUser = () => useContext(UserContext);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getLoggedInUser = async () => {
      try {
        const currentUser = await account.get();
        console.log("Current User:", currentUser);
        setUser(currentUser);
      } catch (err) {
        // no active session or other error — keep user null
        console.warn("No logged in user", err);
        setUser(null);
      }
    };

    getLoggedInUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
