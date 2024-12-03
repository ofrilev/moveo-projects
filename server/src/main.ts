import express, { Express, Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";
import { loginUser, signUpUser } from "../cognito-auth/utils";
import jwt from "jsonwebtoken"; // For generating JWT
import { makeProject } from "./handlers/project/makeProject";
import { updateProject } from "./handlers/project/updateProject";
import { deleteProject } from "./handlers/project/deleteProject";
import { makeTask } from "./handlers/tasks/makeTask";
import { updateTask } from "./handlers/tasks/updateTask";
import { deleteTasks } from "./handlers/tasks/deleteTasks";
import qs from "qs";
import { ParsedQueryRequest } from "./handlers/consts";
import { getProject } from "./handlers/project/getProject";
import { getTasks } from "./handlers/tasks/getTasks";

const app: Express = express();
const port = 8080;
const JWT_SECRET = "your-secret-key"; // Use a strong secret for signing JWTs

//for dev env
app.use(cors({ origin: "http://localhost:5173" , credentials: true}));

// Middleware configuration
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
// Define paths for static files
const projectRoot = path.resolve(__dirname, "../");
const authPath = path.join(projectRoot, "auth");
const appPath = path.join(projectRoot, "client");
const notFoundPath = path.join(projectRoot, "404");

// Utility to verify if the user is authenticated via the JWT cookie
const isAuthenticated = (req: Request): boolean => {
  const jwtCookie = req.cookies["id_token"];
  if (jwtCookie) {
    try {
      jwt.verify(jwtCookie, JWT_SECRET); // Verify JWT
      return true;
    } catch (err) {
      return false;
    }
  }
  return false;
};

// Middleware to redirect users based on authentication status
app.use((req: Request, res: Response, next: NextFunction) => {
  if (req.path === "/" || req.path.startsWith("/app")) {
    if (isAuthenticated(req)) {
      if (req.path === "/") {
        return res.redirect("/app");
      }
      next();
    } else {
      return res.redirect("/auth");
    }
  } else if (req.path.startsWith("/auth")) {
    next();
  } else {
    return res.status(404).sendFile(path.join(notFoundPath, "index.html"));
  }
});

// Serve static files for /auth, /app and /404
app.use("/auth", express.static(authPath));
app.use("/app", express.static(appPath));
app.use("/404", express.static(notFoundPath));

// Login route
//@ts-ignore
app.post("/auth/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Invalid username or password" });
  }

  try {
    const loginResponse = await loginUser(email, password);
    if (!loginResponse.succeed) {
      return res.status(401).json({ error: loginResponse.message });
    }

    // Generate JWT and set it in the cookie
    const token = jwt.sign({ email:email, sub: loginResponse.userSub, role: loginResponse.role }, JWT_SECRET, { expiresIn: "1h" });
    res.cookie("id_token", token, {
      httpOnly: true, // Prevent client-side JS from accessing the cookie
      secure: process.env.NODE_ENV === "production", // Only send in HTTPS in production
      maxAge: 3600000, // 1-hour expiration
      sameSite: "strict", // Strict cross-site policy
    });

    // Redirect to the main app after successful login
    res.redirect("/app");
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Registration route
//@ts-ignore
app.post("/auth/registration", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Invalid email or password" });
  }

  try {
    const signUpResponse = await signUpUser(email, password, email);
    if (!signUpResponse.succeed) {
      return res.status(400).json({ error: signUpResponse.message });
    }

    res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error registering user" });
  }
});

// Logout route
app.get("/auth/logout", (_req: Request, res: Response) => {
  res.clearCookie("id_token", {
    httpOnly: true, // Ensure the cookie is not accessible via client-side scripts
    secure: process.env.NODE_ENV === "production", // Only for HTTPS in production
    sameSite: "strict", // Maintain strict cross-site policy
  });

  // Redirect to the login page or a landing page after logout
  res.redirect("/auth");
});

// Middleware to parse query parameters
app.use((req: ParsedQueryRequest, _res: Response, next: NextFunction) => {
  req.parsedQuery = qs.parse(req.query as any); 
  next();
});

//get-projects
//@ts-ignore
app.get("/app/projects", async (req: Request, res: Response) => {
  const response = await getProject(req);
  if(response.status == 200){
    return res.status(response.status).json(response.data);
  }else{
    res.status(response.status).json(response.message);
  }
})
//insert-new-project
//@ts-ignore
app.post("/app/projects", async (req: Request, res: Response) => {
  const response = await  makeProject(req);
  if(response.status == 201){
    return res.status(response.status).json(response.data);
  }else{
    res.status(response.status).json(response.message);
  }
})
//insert-new-project
//@ts-ignore
app.put("/app/projects", async (req: Request, res: Response) => {
  const response = await  updateProject(req);
  if(response.status == 200){
    return res.status(response.status).json(response.data);
  }else{
    res.status(response.status).json(response.message);
  }
})
//delete-project
//@ts-ignore
app.delete("/app/projects", async (req: Request, res: Response) => {
  const response = await  deleteProject(req);
  if(response.status == 202){
    return res.status(response.status).json(response.data);
  }else{
    res.status(response.status).json(response.message);
  }
})
//get-tasks
//@ts-ignore
app.get("/app/tasks", async (req: Request, res: Response) => {
  const response = await getTasks(req);
  if(response.status == 200){
    return res.status(response.status).json(response.data);
  }else{
    res.status(response.status).json(response.message);
  }
})
//create-task
//@ts-ignore
app.post("/app/tasks", async (req: Request, res: Response) => {
  const response = await makeTask(req);
  if(response.status == 201){
    return res.status(response.status).json(response.data);
  }else{
    res.status(response.status).json(response.message);
  }
})
//update-task
//@ts-ignore
app.put("/app/tasks", async (req: Request, res: Response) => {
  const response = await updateTask(req);
  if(response.status == 200){
    return res.status(response.status).json(response.data);
  }else{
    res.status(response.status).json(response.message);
  }
})
//delete-task
//@ts-ignore
app.delete("/app/tasks", async (req: Request, res: Response) => {
  const response = await deleteTasks(req);
  if(response.status == 202){
    return res.status(response.status).json(response.data);
  }else{
    res.status(response.status).json(response.message);
  }
})
// Start the server
const server = app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

// Handle server shutdown
process.on("SIGINT", () => {
  server.close(() => {
    console.log("Server has stopped listening");
    process.exit(0);
  });
});