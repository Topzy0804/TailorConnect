import { ID } from "appwrite";
import { storage } from "../lib/appwrite";

export const uploadFile = async (bucketId, file) => {
  const response = await storage.createFile({
    bucketId: bucketId,
    fileId: ID.unique(),
    file: file
  });
  return response;
};