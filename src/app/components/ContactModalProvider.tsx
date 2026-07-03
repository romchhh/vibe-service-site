'use client'

import { createContext, useCallback, useContext, useState } from 'react'
import dynamic from 'next/dynamic'
import { useBodyScrollLock } from '@/lib/body-scroll-lock'

const ContactModal = dynamic(() => import('./ContactModal'), { ssr: false })

type ContactModalContextValue = {
  isOpen: boolean
  open: () => void
  close: () => void
}

const ContactModalContext = createContext<ContactModalContextValue | null>(null)

export function ContactModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])

  useBodyScrollLock(isOpen)

  return (
    <ContactModalContext.Provider value={{ isOpen, open, close }}>
      {children}
      {isOpen ? <ContactModal /> : null}
    </ContactModalContext.Provider>
  )
}

export function useContactModal() {
  const ctx = useContext(ContactModalContext)
  if (!ctx) {
    throw new Error('useContactModal must be used within ContactModalProvider')
  }
  return ctx
}
