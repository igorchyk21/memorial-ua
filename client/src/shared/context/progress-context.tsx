'use client'

import React, { createContext } from 'react'
import { AppProgressProvider } from '@bprogress/next'

interface ProgressContextInterface {}

const ProgressContext = createContext<ProgressContextInterface | undefined>(undefined)

export const ProgressProvider = ({ children }: { children: React.ReactNode }) => {
  return ( 
    <ProgressContext.Provider value={{}}>
      <AppProgressProvider height="4px" options={{ showSpinner: false }} shallowRouting disableSameURL={true}>
        {children}
      </AppProgressProvider>
    </ProgressContext.Provider> 
  )
}
