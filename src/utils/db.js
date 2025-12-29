import { tablesDB } from "../lib/appwrite";
import { ID, Query } from "appwrite";
import { storage } from "../lib/appwrite";

export const createRows = async (tableId, data, rowId = ID.unique()) => {
  // Now rowId defaults to ID.unique() unless you provide one
  const response = await tablesDB.createRow({
    databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    tableId: tableId,
    rowId: rowId, 
    data: data,
  });
  return response;
};

export const getRows = async (...args) => {
  // Support two calling conventions used across the codebase:
  // 1) getRows(tableId, queries)
  // 2) getRows(databaseId, tableId, queries)
  let databaseId = import.meta.env.VITE_APPWRITE_DATABASE_ID;
  let tableId;
  let queries = [];

  if (args.length === 1) {
    tableId = args[0];
  } else if (args.length === 2) {
    // If second arg is an array, treat as (tableId, queries)
    if (Array.isArray(args[1])) {
      tableId = args[0];
      queries = args[1];
    } else {
      // otherwise treat as (databaseId, tableId)
      databaseId = args[0];
      tableId = args[1];
    }
  } else if (args.length >= 3) {
    databaseId = args[0];
    tableId = args[1];
    queries = args[2] || [];
  }

  const response = await tablesDB.listRows({
    databaseId: databaseId,
    tableId: tableId,
    queries: queries,
  });
  return response;
};

export const getRow = async (tableId, rowId) => {
  const response = await tablesDB.getRow({
    databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    tableId: tableId,
    rowId: rowId,
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

export const deleteRow = async (tableId, rowId) => {
  const response = await tablesDB.deleteRow({
    databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    tableId: tableId,
    rowId: rowId,
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
