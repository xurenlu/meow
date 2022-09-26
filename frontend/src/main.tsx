import React from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'
import App from './App'
import {ChakraProvider} from "@chakra-ui/react";
const container = document.getElementById('root')
import {ColorModeScript} from "@chakra-ui/react";
import { extendTheme } from '@chakra-ui/react'

// 2. Add your color mode config
const config = ()=>{
    return {
        initialColorMode: 'dark', useSystemColorMode: false,
    }
}


// 3. extend the theme
const theme = extendTheme({ config })
const root = createRoot(container!)

root.render(
  <React.StrictMode>
      <ChakraProvider theme={theme}>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            <App />
      </ChakraProvider>
  </React.StrictMode>
)
