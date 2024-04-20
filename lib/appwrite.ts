import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
  Storage,
} from "react-native-appwrite";
import User from "../types/user";
import { Post } from "../types/post";

export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  projectId: "661d68c9126f4d3d1d82",
  platform: "com.polgubau.trackup",
  databaseId: "66224b6d19da5a40bf59",
  userCollectionId: "66224b846424c00b4258",
  videoCollectionId: "66224bab3b10984d610e",
  storageId: "66224c9d5db8e6495d09",
};

const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

const account = new Account(client);
const storage = new Storage(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

// Register user
export interface CreateUserProps {
  email: string;
  password: string;
  username: string;
}
export async function createUser({
  email,
  password,
  username,
}: CreateUserProps) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username);

    await signIn({ email, password });

    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email: email,
        username: username,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (error) {
    throw new Error(error);
  }
}

export async function modifyUser(
  userId: User["$id"],
  data: Partial<User>
): Promise<User | null> {
  try {
    const user = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      userId,
      data
    );

    return user;
  } catch (error) {
    throw new Error("Error saving biometrics", error);
  }
}

// Sign In
export interface SignInProps {
  email: string;
  password: string;
}
export async function signIn({ email, password }: SignInProps) {
  try {
    const session = await account.createEmailSession(email, password);

    return session;
  } catch (error) {
    throw new Error(error);
  }
}

// Get Account
export async function getAccount() {
  try {
    const currentAccount = await account.get();

    return currentAccount;
  } catch (error) {
    throw new Error(error);
  }
}

// Get Current User
export async function getCurrentUser() {
  try {
    const currentAccount = await getAccount();
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}

// Sign Out
export async function signOut() {
  try {
    const session = await account.deleteSession("current");

    return session;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getUserById(userId: User["$id"]) {
  try {
    const user = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      userId
    );

    return user;
  } catch (error) {
    throw new Error(error);
  }
}

// Upload File
export async function uploadFile(file, type) {
  if (!file) return;

  const { mimeType, ...rest } = file;
  const asset = { type: mimeType, ...rest };

  try {
    const uploadedFile = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      asset
    );

    const fileUrl = await getFilePreview(uploadedFile.$id, type);
    return fileUrl;
  } catch (error) {
    throw new Error(error);
  }
}

// Get File Preview
export async function getFilePreview(fileId, type) {
  let fileUrl;

  try {
    if (type === "video") {
      fileUrl = storage.getFileView(appwriteConfig.storageId, fileId);
    } else if (type === "image") {
      fileUrl = storage.getFilePreview(
        appwriteConfig.storageId,
        fileId,
        2000,
        2000,
        "top",
        100
      );
    } else {
      throw new Error("Invalid file type");
    }

    if (!fileUrl) throw Error;

    return fileUrl;
  } catch (error) {
    throw new Error(error);
  }
}

// Create Video Post
export async function createVideoPost(form) {
  try {
    const [thumbnailUrl, videoUrl] = await Promise.all([
      uploadFile(form.thumbnail, "image"),
      uploadFile(form.video, "video"),
    ]);

    const newPost = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      ID.unique(),
      {
        title: form.title,
        thumbnail: thumbnailUrl,
        video: videoUrl,
        prompt: form.prompt,
        creator: form.userId,
      }
    );

    return newPost;
  } catch (error) {
    throw new Error(error);
  }
}

// Get all video Posts
export async function getAllPosts(): Promise<Post[] | null> {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId
    );

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}

// Get video posts created by user
export async function getUserPosts(userId: User["$id"]) {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      [Query.equal("creator", userId)]
    );

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}

// Get video posts that matches search query
export async function searchPosts(query) {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      [Query.search("title", query)]
    );

    if (!posts) throw new Error("Something went wrong");

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}

// Get latest created video posts
export async function getLatestPosts() {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      [Query.orderDesc("$createdAt"), Query.limit(7)]
    );

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}

export const getExercises = async () => {
  const url = "http://13.39.23.87/exercises?page=0&size=10&locale=en";
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export interface Routine {
  id: number;
  name: string;
  image: string;
  exercises: {
    id: number;
    name: string;
    image: string;
  }[];
  creator: {
    id: number;
    username: string;
    image: string;
  };
  dateOfCreation: string;
  dateOfLastEdition: string;
  public: boolean;
}
export const getRoutines = async (): Promise<Routine[] | null> => {
  const url = "http://13.39.23.87/routines";
  const response = await fetch(url);
  const data = await response.json();
  return data;
};
