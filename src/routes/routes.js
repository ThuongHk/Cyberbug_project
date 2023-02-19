import CyberBoard from "../cyberbugs/cyberBoard/CyberBoard";
import CreateProject from "../pages/createProject/CreateProject";
import LoginCyberLearn from '../login/LoginCyberLearn';
import TodolistRFC from "../Todolist_partten/TodolistRFC";



export const publicRoutes = [
    { path: '/', component: CyberBoard},
    { path: '/createproject', component: CreateProject},
    { path: '/todolistsaga', component: TodolistRFC, layout: TodolistRFC },
    { path: '/login', component: LoginCyberLearn, layout: LoginCyberLearn}
]