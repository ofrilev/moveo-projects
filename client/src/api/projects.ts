import { deleteReq, FetchRequest, postReq, putReq } from "./makeRequest";
export type Project ={
    id: string,
    title: string,
    description: string,
    role: string
}
export const getProjects = async ():Promise<Project[]> => {
    let projects: Project[] = []
    const req = new FetchRequest<Project[]>("/projects", projects);
    await req.fetchData();
    if(req.response.status != 1 && req.response.data){
        return req.response.data
    }
    return projects
}
export const postProject = async (title: string, description: string):Promise<string> => {
    const res = await postReq("/projects", {title, description})
    if (res.status != 1) {
        res.response as string
    }
    return ""

}
export const deleteProject  = async(projectid: string): Promise<void> => {
    const res  = await deleteReq(`/projects?id=${projectid}`)
    if (res.status != 1) {
        console.log("succeed delete project")
    }
    return 
}
export const updateProject  = async(props:{projectid: string, title: string, description: string}): Promise<void> => {
    const res  = await putReq(`/projects?id=${props.projectid}`, {title: props.title, description: props.description} )
    if (res.status != 1) {
        console.log("succeed update project")
    }
    return 
}