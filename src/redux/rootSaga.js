import axios from "axios";
import { call, put, takeLatest,delay, select } from 'redux-saga/effects'
import { TOKEN, USER_LOGIN } from "../util/settingSytem";
import { GET_ALL_CATEGORY_SAGA } from "./constan/cyberbugCategory";
import { LOGIN_SAGA } from "./constan/login";
import { ADD_TASK_LIST_SAGA, CHECK_DONE_TASK_SAGA, GET_TASK_LIST_SAGA } from "./constan/todolist";
import { getAllCategory } from "./reducer/cyberbugCategory";
import { displayLoading } from "./reducer/loadingSlice";
import { tokenLogin } from "./reducer/savaTokenSlice";
import { getTodolist } from "./reducer/todolistSlice";
console.log('axios', axios);

// ------todolist----
function*getTaskListSaga(){
    try{
       const { data, status } = yield call(()=>{
        return axios({
            url: 'https://svcy.myclass.vn/api/ToDoList/GetAllTask',
            method: 'GET'
        })
       })
       console.log(axios);
       yield put(getTodolist(data))
    }catch(err){
        console.log(err);
    }
}

function*checkDoneTask(action){
    console.log(action);
    const {taskName} = action
    try{
       const { data, status} = yield call(()=>{
      return axios({
        url: `https://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
        method: 'PUT'
       
      })  

       })
      if(status === 200){
        yield put({
            type: GET_TASK_LIST_SAGA
        })
      }
    }catch(err){
        console.log(err);
    }
}

function*addTaskList(action){
    const {taskName} = action;
    yield put(displayLoading(true));
    yield delay(1000)
    try{
          const {data, status} = yield call(()=>{
            return axios({
                url: 'https://svcy.myclass.vn/api/ToDoList/AddTask',
                method: 'POST',
                data: {taskName: taskName}
            })
          })
          if(status === 200){
            yield put({
                type: GET_TASK_LIST_SAGA
            })
          }
    }catch(err){
        console.log(err);
    }
    yield put(displayLoading(false));
}

// ----login----

function*userLogin(action){
    console.log(action);
    try{
        const {data, status} = yield call(()=>{
            return axios({
                url: 'https://shop.cyberlearn.vn/api/Users/signin',
                method: 'POST',
                data: action.userLogin
            })
        })
        // console.log(data);
    localStorage.setItem(TOKEN, data.content.accessToken);
    localStorage.setItem(USER_LOGIN,JSON.stringify(data.content));

    const navigate = yield select(state => state.navigateSlice.userNavigate);
    console.log(navigate);
    navigate('/todolistsaga')
    yield put(tokenLogin(data.content))

    }catch(err){
        console.log(err);
    }
}


// --------cyberbugCategory--------------------
function*getAllCategorySaga(){
    try{
          const {data, status} = yield call(()=>{
            return axios({
                url: 'http://casestudy.cyberlearn.vn/api/ProjectCategory',
                method: 'GET',
            })
          })
          yield put(getAllCategory(data.content))
    }catch(err){
        console.log(err.response.data);
    }
}
// -------newProject--------------------------------

function*newProjectNameSaga(action){
    // console.log(action);
    
  try{
    const {data, status} = yield call(()=>{
        return axios({
            url: 'http://casestudy.cyberlearn.vn/api/Project/createProjectAuthorize',
            method: 'POST',
            data: action.newProject,
            headers: {'Authorization': 'Bearer ' + localStorage.getItem(TOKEN)}
        })
        
    })
    console.log(data, status);
    
  }catch(err){
    console.log(err.response);
  }
}

export function*rootSaga(){
// ----todolist----
 yield takeLatest(GET_TASK_LIST_SAGA, getTaskListSaga)
 yield takeLatest(CHECK_DONE_TASK_SAGA, checkDoneTask)
 yield takeLatest(ADD_TASK_LIST_SAGA, addTaskList)

//  -----login----
yield takeLatest(LOGIN_SAGA, userLogin)

// ==== cyberbugCategory =================================================================

yield takeLatest(GET_ALL_CATEGORY_SAGA, getAllCategorySaga)

// ------newProject---------
   yield takeLatest('NEW_PROJECT_SAGA', newProjectNameSaga)
}