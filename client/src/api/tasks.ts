import { deleteReq, FetchRequest, postReq, putReq } from "./makeRequest";
export type Task ={
    id: string,
    title: string,
    description: string,
    role: string,
    projectid: string,
    status: string,
}
export const getTasks = async ():Promise<Task[]> => {
    let tasks: Task[] = []
    const req = new FetchRequest<Task[]>("/tasks", tasks);
    await req.fetchData();
    if(req.response.status != 1 && req.response.data){
        return req.response.data
    }
    return tasks
}
export const postTask = async (props:{title: string, description: string, projectid: string, status: string}):Promise<string> => {
    if(props.status === "IN PROGRESS") props.status = "INPROGRESS"
    const res = await postReq("/tasks", {title:props.title, description: props.description, projectid :props.projectid,status: props.status})
    if (res.status != 1) {
        res.response as string
    }
    return ""

}
export const deleteTask  = async(taskid: string): Promise<void> => {
    const res  = await deleteReq(`/tasks?id=${taskid}`)
    if (res.status != 1) {
        console.log("succeed delete task")
    }
    return 
}
export const updateTask  = async(props:{taskid: string, title: string, description: string, status: string}): Promise<void> => {
    const res  = await putReq(`/tasks?id=${props.taskid}`, {title: props.title, description: props.description, status: props.status} )
    if (res.status != 1) {
        console.log("succeed update task")
    }
    return 
}