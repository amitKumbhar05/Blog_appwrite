import { Client, Account,ID } from "appwrite";
import config from "../config/config"




class Authservice {
    client = new Client()
    account
    constructor(){
        this.client
        .setEndpoint(config.appwriteUrl)
        .setProject(config.appwriteProjectid)
        this.account = new Account(this.client)
    }
    
    async createAccount ({email,password,name})
    {
        try {
            const userAccount = await this.account.create(ID.unique(),email,password,name);
            if(userAccount)
            {
                return this.login({email,password})
            }
            else
            {
                return userAccount;
            }

        } catch (error) {
            console.error("Error creating account:", error);
            throw error; 
        }
    }
    
    async login ({email,password})
    {
        try {
            return await this.account.createEmailSession(email,password)
            
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.error("Error getting current user:", error);
        }
        return null;
    }
    

    async logout ()
    {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            throw error
        }
    }

}

const authservices = new Authservice();

export default authservices;