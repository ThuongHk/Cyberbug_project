import { Route, Routes } from 'react-router-dom'
import CyberbugTemplate from './cyberbugs/CyberbugTemplate'
import { publicRoutes } from './routes/routes'
import { Fragment } from 'react'

function App() {
  return (
    <div className="App">
      <Routes>
        {publicRoutes.map((route, index) => {
          const Page = route.component
          let Layout = CyberbugTemplate
          if (route.layout) {
            Layout = route.layout
          } else if(route.layout === null)
           {
            Layout = Fragment
          }
          return (<Route key={index} path={route.path} element={<Layout> <Page /> </Layout>}/> )
        })}
      </Routes>
    </div>
  )
}

export default App
