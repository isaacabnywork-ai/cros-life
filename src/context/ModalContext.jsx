import React, { createContext, useContext, useState, useCallback } from 'react'

const ModalContext = createContext(null)

export function ModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState('early-bird') // 'early-bird' | 'regular'

  const openRegisterModal = useCallback((plan = 'early-bird') => {
    setSelectedPlan(plan)
    setIsOpen(true)
  }, [])

  const closeRegisterModal = useCallback(() => {
    setIsOpen(false)
  }, [])

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        selectedPlan,
        setSelectedPlan,
        openRegisterModal,
        closeRegisterModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  )
}

export function useModal() {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider')
  }
  return context
}
