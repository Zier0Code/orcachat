import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import appRouter from './router/appRouter'


function App() {
  const router = createBrowserRouter(appRouter)
  return (
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  )
}
export default App;