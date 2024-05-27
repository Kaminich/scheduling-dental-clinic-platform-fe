import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.css'
import { ChakraProvider } from '@chakra-ui/react'
import { RouterProvider } from 'react-router-dom'
import router from './routes/routes.tsx'
import { GoogleOAuthProvider } from '@react-oauth/google'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider clientId='758503744205-dsdvki2sdmn0cm90316md5djc6afncuf.apps.googleusercontent.com'>
    <React.StrictMode>
      <ChakraProvider>
        <RouterProvider router={router} />
      </ChakraProvider>
    </React.StrictMode>
  </GoogleOAuthProvider>
)
