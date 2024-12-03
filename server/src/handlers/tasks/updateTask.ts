import {Request} from "express"
import { HandlerResponse } from "../consts";
import { dbClass } from "../../dbClass";
import { getUserDataFromJWT } from "../../../cognito-auth/getUserIdFromJWT";
import { Status } from "./enumStatus";

export const updateTask = async(req: Request ):Promise<HandlerResponse> => {
    const id = req.query.id as string
    if (!id || id === "") {
        return {status: 400, message: "Task id is required"};
    }
    const {title, description, status} = req.body
    const jwtCookie = req.cookies["id_token"];
    let statusNumber = Status[status.trim().replace(/\s/g, '').toUpperCase() as keyof typeof Status]
    const {role} = getUserDataFromJWT(jwtCookie);
    const db = dbClass.getInstance(role)
    const tasks = await db.fetchTasks();
    let isTaskExist = tasks.data && tasks.data.find((task: any) => task.id == id)
    if (!isTaskExist || isTaskExist.length === 0){
        return {status: 400, message: "Task not found"};
    }
    const res = await db.updateTask(id, title, description, statusNumber)
    if (res.error){
        return {status: 400, message: res.error};
    }else{
        return {status: 200, message: "Task updated successfully"}
    }

}