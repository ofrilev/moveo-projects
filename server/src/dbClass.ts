import { createClient } from "@supabase/supabase-js";
type Response = {
    error?: string,
    data: any,
}
export class dbClass {
    private role: string;
    private static instance: dbClass;
    private supabase: any;
    private url = "https://jcnrhhmmaixygekboxxj.supabase.co";
    private anone_key="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpjbnJoaG1tYWl4eWdla2JveHhqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMwNjgzMjUsImV4cCI6MjA0ODY0NDMyNX0.4siNsptQYM4DUqdNs8UJ_dPOi775crqNcKpuDJGi-0s"
    private constructor() {
        // this.supabase = createClient( 'https://jcnrhhmmaixygekboxxj.supabase.co',"Q^32hV%UCQa^W7g9okQr2^A95!Hds9hy#TfE$g%cR");
        this.supabase = createClient(this.url, this.anone_key);
        this.role = "3"
    }
    public static getInstance(role: string): dbClass {
        if (!dbClass.instance) {
            dbClass.instance = new dbClass();
            dbClass.instance.role = role
        }
        dbClass.instance.role = role
        return dbClass.instance;
    }
    async fetchProjects(): Promise<Response> {
        const { data } = await this.supabase
        .from('projects')
        .select("*").gte("role",this.role)
      return{data: data}
    }
    async fetchTasks(): Promise<Response> {
        const { data } = await this.supabase
        .from('tasks')
        .select("*").gte("role",this.role)
      return{data: data}
    }

    
    async getTasksByProjectId(projectid: string): Promise<Response> {
        const { data, error } = await this.supabase
            .from('tasks')
            .select("*").eq("projectid", projectid)
          if (error) {
            console.log(error);
            return {
                error: error.message,
                data: ""
            }
        }
            return{data: data}
    }
    async getTasksBy(field: string, value: string, userid: string): Promise<Response> {
        const { data } = await this.supabase
            .from('tasks')
            .select("id").eq("userid", userid).eq(`${field}`, value)
          return{data: data}
    }
    async getTasks() {
        const { data, error } = await this.supabase
            .from('tasks')
            .select()
        return data;
    }
    async addProject(title: string, description: string,userid: string): Promise<Response> {
        const { data, error } = await this.supabase
            .from('projects')
            .insert([{ title: title, description: description,  userid: userid, role: this.role }]).select()
        if (error) {
            console.log(error);
            return {
                error: error.message,
                data: ""
            }
        }
        return {data: data};
    }
    async addTask(prop:{projectid: string, title: string, description: string,status: string, userid: string}) {
        const { data, error } = await this.supabase
            .from('tasks')
            .insert({ title: prop.title, description: prop.description, status:prop.status, projectid: prop.projectid, userid: prop.userid, role: this.role }).select()
        if (error) {
            console.log(error);
            return {
                error: error.message,
                data: ""
            }
        }
        return {data: data};
    }
    async updateProject(id: string, title: string, description: string) {
        let updateObj: any = {}
        if (title !== "") {
            updateObj["title"] = title
        }
        if (description !== "") {
            updateObj["description"] = description
        }
        const { data, error } = await this.supabase
            .from('projects')
            .update({ ...updateObj }).eq("id", id).select()
        if (error) {
            console.log(error);
            return {
                error: error.message,
                data: ""
            }
        }
        return data;
    }
    async deleteProject(id: string):Promise<Response> {
        const { data, error } = await this.supabase
            .from('projects')
            .delete().eq("id", id).select()
        if (error) {
            console.log(error);
            return {
                error: error.message,
                data: ""
            }
        }
        return data;
    }
    async updateTask(id: string, title: string, description: string, status: string) {
        let updateObj: any = {}
        if (title !== "") {
            updateObj["title"] = title
        }
        if (description !== "") {
            updateObj["description"] = description
        }
        if (status !== "") {
            updateObj["status"] = status
        }
        const { data, error } = await this.supabase
            .from('tasks')
            .update({ ...updateObj }).eq("id", id).select()
        if (error) {
            console.log(error);
            return {
                error: error.message,
                data: ""
            }
        }
        return data;
    }
    async deleteTask(id: string):Promise<Response> {
        const { data, error } = await this.supabase
            .from('tasks')
            .delete().eq("id", id).select()
        if (error) {
            console.log(error);
            return {
                error: error.message,
                data: ""
            }
        }
        return data;
    }
}

