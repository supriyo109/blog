// import React from 'react'
// import { useSelector } from 'react-redux'

// const ThemeProvider = ({children}) => {
//     const {theme} = useSelector(state=>state.theme)
//   return (
//     <div className={theme}>
//         <div className='bg-gray-100 text-gray-800 dark:text-gray-200 dark:bg-[rgb(16,23,42)]'>
//             {children}    
//         </div>      
//     </div>
//   )
// }

// export default ThemeProvider

import React from 'react'
import { useSelector } from 'react-redux'

const ThemeProvider = ({ children }) => {
  const { theme } = useSelector(state => state.theme) // theme = 'dark' or 'light'

  return (
    <div className={theme}> {/* This must be 'dark' for Tailwind to apply dark styles */}
      <div className='bg-gray-100 text-gray-800 dark:text-gray-200 dark:bg-[rgb(16,23,42)]'>
        {children}
      </div>
    </div>
  )
}

export default ThemeProvider