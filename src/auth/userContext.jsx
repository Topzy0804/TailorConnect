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
        console.log("Current User:", currentUser);
        const userProfile = await tablesDB.getRow({
          databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID_USERS,
          tableId: import.meta.env.VITE_APPWRITE_TABLE_ID_USERS,
          rowId: currentUser.$id,
        })
        console.log("User Profile:", userProfile);
        setUser({
          email: userProfile.email,
          role: userProfile.role,
          $id: currentUser.$id,
          name: userProfile.fullName,
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
