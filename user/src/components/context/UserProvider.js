import React, { useEffect, useState } from 'react'
import { createContext } from 'react'

export const UserContext = createContext(null);
function UserProvider({children}) {
    const [person,setPerson] = useState(null)
    
  return (
      <UserContext.Provider value={{
        person,
        setPerson
      }} >
      {children}
      </UserContext.Provider>
  )
}

export default UserProvider