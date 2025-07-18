import {Account, Avatars, Client, Databases, ID, Query, Storage} from "react-native-appwrite";
import {CreateUserParams, GetMenuParams, SignInParams} from "@/type";

export const appwriteConfig = {
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
    platform: 'com.muhuan.choma',
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
    databaseId: '686f9b2400261bbadddc',
    bucketId: '687775dc001f0fa7cdcc',
    userCollectionId: '686f9b70002ca1ba3b94',
    categoriesCollectionId: '6876a048003c610b70d1',
    menuCollectionId: '6876a22d000bc333eb0f',
    customizationsCollectionId: '6877703f000117df2837',
    menuCustomizationsCollectionId: '687771e7002c97774ef6',

}

export const client = new Client()

client
        .setEndpoint(appwriteConfig.endpoint)
        .setProject(appwriteConfig.projectId)
        .setPlatform(appwriteConfig.platform)

export const account = new Account(client)

export const databases = new Databases(client)

export const storage = new Storage(client)

export const avatars = new Avatars(client)



export const createUser = async({email, password, name}: CreateUserParams) => {
    try {
        const newAccount = await account.create(ID.unique(), email, password, name)

        if(!newAccount) throw Error;

        await signIn({email, password})

        const avatarUrl = avatars.getInitialsURL(name)

        return await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                name, email, avatar: avatarUrl
            }
        );

    } catch (e) {
        throw new Error(e as string)
    }
}

export const signIn = async({email, password}: SignInParams ) => {
    try {
        // Check if there's an active session
        try {
            const currentSession = await account.getSession('current');
            if (currentSession) {
                // Delete the current session if it exists
                await account.deleteSession('current');
            }
        } catch (error) {
            // No active session, continue with sign in
        }

        // Create a new session
        const session = await account.createEmailPasswordSession(email, password);
        return session;
    } catch (e) {
        throw new Error(e as string)
    }
}

export const getCurrentUser = async() => {
    try {
        const currentAccount = await account.get();
        if(!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [
                Query.equal('accountId', currentAccount.$id)
            ]
        )
        if(!currentUser) throw Error;
        return currentUser.documents[0];
    } catch (e) {

        console.log(e)
        throw new Error(e as string)
    }
}

export const getMenu = async({category, query, limit}: GetMenuParams) => {
    try {
        const queries: string[] = [];

        if(category) {
            queries.push(Query.equal('categories', category))
        }
        if(query) {
            queries.push(Query.search('name', query))
        }
        if(limit) {
            queries.push(Query.limit(limit))
        }

        const menus = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.menuCollectionId,
            queries
        )

        return menus.documents;
    } catch (e) {
        throw new Error(e as string)
    }
}

export const getCategories = async() => {
    try {
        const categories = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.categoriesCollectionId
        )
        return categories.documents;
    } catch (e) {
        throw new Error(e as string)
    }
}
