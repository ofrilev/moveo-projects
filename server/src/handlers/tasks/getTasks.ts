import { getUserDataFromJWT } from "../../../cognito-auth/getUserIdFromJWT";
import { dbClass } from "../../dbClass";
import { HandlerResponse, ParsedQueryRequest } from "../consts";

export const getTasks = async (req: ParsedQueryRequest):Promise<HandlerResponse> => {
    let {id} = req.parsedQuery
    const jwtCookie = req.cookies["id_token"];
    const {role} = getUserDataFromJWT(jwtCookie);
    const db = dbClass.getInstance(role)
    const tasks = await db.fetchTasks();
    if(tasks.data){
        tasks.data.forEach((task: any) => {
            task.status = getStatusString(task.status)
        })
        return {data: [tasks.data], status: 200}
    }
    return {data: [], status: 200}
}
const getStatusString = (status: number) => {
    switch (status) {
        case 0:
            return "todo"
        case 1:
            return "in_progress"
        case 2:
            return "done"
    }
    
}