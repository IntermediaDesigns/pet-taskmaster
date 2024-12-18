import {
    Account,
    Client,
    Databases,
    Storage,
    ID,
} from "appwrite";

/** Setup */
export const appwriteClient = new Client()
    .setEndpoint(import.meta.env.PUBLIC_APPWRITE_ENDPOINT) // Your API Endpoint
    .setProject(import.meta.env.PUBLIC_APPWRITE_PROJECT_ID); // Your project ID

export const appwriteDatabases = new Databases(appwriteClient);
export const appwriteStorage = new Storage(appwriteClient);


/** Account */
export const appwriteAccount = new Account(appwriteClient);
export const isLoggedIn = atom(undefined);


// Check for session
appwriteAccount.getSession("current").then(
    function (response) {
        isLoggedIn.set(response);
    },
    function (error) {
        isLoggedIn.set(undefined);
    }
);


export const login = async (email, password) => {
    try {
        const session = await appwriteAccount.createEmailSession(email, password);
        isLoggedIn.set(session);
        window.location.href = "/account";
    } catch (error) {
        const appwriteError = error;
        alert(appwriteError.message);
    }
};

export const logout = async () => {
    try {
        const session = isLoggedIn.get();
        if (session?.$id) {
            await appwriteAccount.deleteSession(session?.$id);
            isLoggedIn.set(undefined);
            window.location.href = "/";
        }
    } catch (error) {
        const appwriteError = error;
        alert(appwriteError.message);
    }
};

export const register = async (email, password) => {
    try {
        await appwriteAccount.create(ID.unique(), email, password);
        const session = await appwriteAccount.createEmailSession(email, password);
        isLoggedIn.set(session);
        window.location.href = "/account";
    } catch (error) {
        const appwriteError = error;
        alert(appwriteError.message);
    }
};

export const account = async () => {
    try {
        return appwriteAccount.get();
    } catch (error) {
        const appwriteError = error;
        alert(appwriteError.message);
    }
};
