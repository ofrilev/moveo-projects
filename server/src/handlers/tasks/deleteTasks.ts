import {Request} from "express"
import { HandlerResponse } from "../consts";
import { dbClass } from "../../dbClass";
import { getUserDataFromJWT } from "../../../cognito-auth/getUserIdFromJWT";

export const deleteTasks = async(req: Request ):Promise<HandlerResponse> => {
    const id = req.query.id as string
    if (!id || id === "") {
        return {status: 400, message: "Task id is required"};
    }
    const jwtCookie = req.cookies["id_token"];
    const {role} = getUserDataFromJWT(jwtCookie);
    const db = dbClass.getInstance(role)
    const tasks = await db.fetchTasks();
    let isTaskExist = tasks.data && tasks.data.find((task: any) => task.id == id)
    if (!isTaskExist || isTaskExist.length === 0){
        return {status: 400, message: "Task not found"};
    }
    const res = await db.deleteTask(id)
    if (res.error){
        return {status: 400, message: res.error};
    }else{
        return {status: 202, message: "Task deleted successfully"};
    }
}