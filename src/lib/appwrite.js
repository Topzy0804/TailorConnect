import { ID, Client, Account, Teams, TablesDB, Storage, } from "appwrite";

const client = new Client();

client
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

  const teams = new Teams(client);

  // teams.create({
  //   teamId: ID.unique(),
  //   name: "TailorConnect Team",
  //   roles: ["taior", "customer", "admin"],
  // })

const account = new Account(client);
const tablesDB = new TablesDB(client);
const storage = new Storage(client);

export { ID, account, tablesDB, storage, teams, client };
