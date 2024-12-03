import { getUserDataFromJWT } from "../../../cognito-auth/getUserIdFromJWT";
import { dbClass } from "../../dbClass";
import { HandlerResponse, ParsedQueryRequest } from "../consts";

export const getProject = async (req: ParsedQueryRequest):Promise<HandlerResponse> => {
    let {id} = req.parsedQuery
    const jwtCookie = req.cookies["id_token"];
    const {role} = getUserDataFromJWT(jwtCookie);
    const db = dbClass.getInstance(role)
    const projects = await db.fetchProjects();
    if(projects.data){
        return {data: [projects.data], status: 200}
    }
    return {data: [], status: 200}
}