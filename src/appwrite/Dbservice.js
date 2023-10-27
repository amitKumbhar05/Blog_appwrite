import { Client, Databases,Storage,Query,ID } from "appwrite";
import config from "../config/config"

class Databaseservice
{
    client = new Client()
    database
    bucket
    constructor()
    {
        this.client
        .setEndpoint(config.appwriteUrl)
        .setProject(config.appwriteProjectid)
         
        this.database = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    async createPost ({title,slug,content,featuredImage,userId,status})
    {
        try {
            console.log("userid=",userId);
            return await this.database.createDocument(
                config.appwriteDatabaseid,
                config.appwriteCollectionid,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
            
        } catch (error) {
            console.log("error in create ",error);
        }
    }

    async updatePost(slug,{title,content,featuredImage,status})
    {
        try {
            return await this.database.updateDocument(
                config.appwriteDatabaseid,
                config.appwriteCollectionid,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
            
        } catch (error) {
            throw error;
        }
    }

    async deletePost(slug)
    {
        try {
            await this.database.deleteDocument(
                config.appwriteDatabaseid,
                config.appwriteCollectionid,
                slug
            )
            return true
        } catch (error) {
            console.log(error);
            return false
            
        }
    }

    async getPost(slug)
    {
        try {
            return await this.database.getDocument(
                config.appwriteDatabaseid,
                config.appwriteCollectionid,
                slug
            )
            
        } catch (error) {
            console.log(error);
            return false
            
        }
    }

    async getPosts(queries=[Query.equal("status","active")])
    {
        try {
            return await this.database.listDocuments(
                config.appwriteDatabaseid,
                config.appwriteCollectionid,
                queries
            )
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    //file upload

    async fileUpload(file)
    {
        try {
            return await this.bucket.createFile(
                config.appwriteBucketid,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log(error);
            return false
        }
    }

    async deleteFile(fileId)
    {
        try {
            await this.bucket.deleteFile(
                config.appwriteBucketid,
                fileId
            )
            return true
        } catch (error) {
            console.log(error);
            return false
        }
    }

    getFilePreview(fileId)
    {
        try {
            return this.bucket.getFilePreview(
                config.appwriteBucketid,
                fileId
            )
            
        } catch (error) {
            console.log("error in preview image :",error);
        }
    }


}

const databaseservice = new Databaseservice()

export default databaseservice;