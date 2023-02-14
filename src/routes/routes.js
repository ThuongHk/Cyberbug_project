import CyberBoard from "../cyberbugs/cyberBoard/CyberBoard";
import CreateProject from "../pages/createProject/CreateProject";

export const publicRoutes = [
    { path: '/', component: CyberBoard},
    { path: '/createproject', component: CreateProject}
]