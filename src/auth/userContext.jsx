import { createContext, useState, useEffect, useContext } from "react";
import { account, tablesDB } from "../lib/appwrite";

const UserContext = createContext();

// custom hook — call inside components only
export const useUser = () => useContext(UserContext);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getLoggedInUser = async () => {
      try {
        const currentUser = await account.get();

        const userProfile = await tablesDB.getRow({
          databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
          tableId: import.meta.env.VITE_APPWRITE_TABLE_ID_USERS,
          rowId: currentUser.$id,
        })

        setUser({
          email: userProfile.email,
          role: userProfile.role,
          $id: userProfile.$id,
          name: userProfile.name,
        });
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
