import { dbClass } from "../../dbClass";
import { HandlerResponse } from "../consts";
import {Request} from "express";
import { getUserDataFromJWT } from "../../../cognito-auth/getUserIdFromJWT";


export const makeProject = async(req: Request ):Promise<HandlerResponse> => {
    const {title, description} = req.body
    const jwtCookie = req.cookies["id_token"];
    const {userid,role} = getUserDataFromJWT(jwtCookie);
    if(!title || title === "") return {status: 400, message: "Title is required"};
    const db = dbClass.getInstance(role)
    const projects = await db.fetchProjects();
    let isExistingProject = projects.data && projects.data.find((project: any) => project.title == title)
    if(isExistingProject && isExistingProject.data > 0){
        console.log("Project with this title already exists")
        return {status: 400, message: "Project with this title already exists"};
    }else{
        const res = await db.addProject(title, description, userid)
        if (res.error){
            return {status: 400, message: res.error};
        }else{
            return {status: 201, message: "Project created successfully", data:{id: res.data[0].id}}
        }
    }
}