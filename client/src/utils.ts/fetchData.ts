import { getProjects, Project } from "../api/projects"
import { getTasks, Task } from "../api/tasks"
export type FetchedData = (Project & { tasks: Task[] | [] })[]

export const fetchData = async (): Promise<FetchedData> => {
    const projects = await getProjects()
    const tasks = await getTasks()

    const projectIdMap = new Map<string, Project & { tasks: Task[] }>()
    for (const project of projects) {
        const existingTasks = tasks.filter(task => task.projectid === project.id)
        projectIdMap.set(project.id, { ...project, tasks: existingTasks })
    }

    return [...projectIdMap.values()]
}

