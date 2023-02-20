import createSagaMiddleware from "@redux-saga/core";
import { configureStore } from "@reduxjs/toolkit";
import cyberbugCategory from "./reducer/cyberbugCategory";
import loadingSlice from "./reducer/loadingSlice";
import navigateSlice from "./reducer/navigateSlice";
import savaTokenSlice from "./reducer/savaTokenSlice";
import todolistSlice from "./reducer/todolistSlice";
import { rootSaga } from "./rootSaga";


const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
    reducer:{
        todolistSlice,
        loadingSlice,
        savaTokenSlice,
        navigateSlice,
        cyberbugCategory 
    },
    middleware: [sagaMiddleware]
})
sagaMiddleware.run(rootSaga)
export default store;