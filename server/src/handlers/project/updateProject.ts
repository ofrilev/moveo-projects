import {Request} from "express"
import { HandlerResponse } from "../consts";
import { dbClass } from "../../dbClass";
import { getUserDataFromJWT } from "../../../cognito-auth/getUserIdFromJWT";

export const updateProject = async(req: Request ):Promise<HandlerResponse> => {
    const id = req.query.id as string
    if (!id || id === "") {
        return {status: 400, message: "Project id is required"};
    }
    const {title, description} = req.body
    if(title === "") return {status: 400, message: "Cannot modify title to empty"};
    const jwtCookie = req.cookies["id_token"];
    const {role} = getUserDataFromJWT(jwtCookie);
    const db = dbClass.getInstance(role)
    const projects = await db.fetchProjects();
    let isProjectExist = projects.data && projects.data.find((project: any) => project.id == id)
    if (!isProjectExist || isProjectExist.length === 0){
        return {status: 400, message: "Project not found"};
    }
    const res = await db.updateProject(id, title, description)
    if (res.error){
        return {status: 400, message: res.error};
    }else{
        return {status: 200, message: "Project updated successfully"}
    }

}