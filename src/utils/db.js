import { tablesDB } from "../lib/appwrite";
import { ID, Query } from "appwrite";
import { storage } from "../lib/appwrite";

export const createRows = async (tableId, data) => {
  const response = await tablesDB.createRow({
    databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    tableId: tableId,
    rowId: ID.unique(),
    data: data,
  });
  return response;
};

export const getRows = async (tableId, queries = []) => {
  const response = await tablesDB.listRows({
    databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    tableId: tableId,
    queries: queries,
  });
  return response;
};

export const updateRow = async (tableId, rowId, data) => {
  const response = await tablesDB.updateRow({
    databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    tableId: tableId,
    rowId: rowId,
    data: data,
  });
  return response;
};

// Lightweight helper to fetch a single row (by rowId) if needed
export const fetchRow = async (tableId, rowId) => {
  const response = await tablesDB.getRow({
    databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    tableId: tableId,
    rowId: rowId,
  });
  return response;
};


// export Query so callers can build queries consistently
export { Query };
