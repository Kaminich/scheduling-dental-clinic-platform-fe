import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.css'
import { ChakraProvider } from '@chakra-ui/react'
import { RouterProvider } from 'react-router-dom'
import router from './routes/routes.tsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from './context/AuthContext.tsx'

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider clientId='758503744205-dsdvki2sdmn0cm90316md5djc6afncuf.apps.googleusercontent.com'>
    <React.StrictMode>
      <AuthProvider>
        <ChakraProvider>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
          </QueryClientProvider>
        </ChakraProvider>
      </AuthProvider>
    </React.StrictMode>
  </GoogleOAuthProvider>
)
