import {Request} from "express"
import { HandlerResponse } from "../consts";
import { getUserDataFromJWT } from "../../../cognito-auth/getUserIdFromJWT";
import { dbClass } from "../../dbClass";
import { Status } from "./enumStatus";

export const makeTask = async(req: Request ):Promise<HandlerResponse> => {
    const {projectid, status,title,description} = req.body;
    const jwtCookie = req.cookies["id_token"];
    const {userid, role} = getUserDataFromJWT(jwtCookie);
    if(!projectid || projectid === "") return {status: 400, message: "Project id is required"};
    if(!title || title === "") return {status: 400, message: "Title is required"};
    let statusNumber = Status[status.toUpperCase() as keyof typeof Status]
    const db = dbClass.getInstance(role)
    const projects = await db.fetchProjects();
    let isProjectExist = projects.data && projects.data.find((project: any) =>  project.id == projectid
    )
    if(!isProjectExist || isProjectExist.length === 0){
        return {status: 400, message: "Bad request, projectid does not exist"}
    }
    const tasks = await db.getTasksByProjectId(projectid)
    if(tasks.error){
        return {status: 400, message: tasks.error}
    } 
    if(tasks.data.length > 0){
        for (const task of tasks.data){
            if (task.title === title) {
                return {status: 400, message: "Task already exists with that name under this project"};
            }
        }
    }
    const res = await db.addTask({projectid, title, description, status: statusNumber ?? "0", userid})
    if (res.error){
        return {status: 400, message: res.error};
    }else{
        return {status: 201, message: "Task created successfully", data:{id: res.data[0].id}}
    }

}