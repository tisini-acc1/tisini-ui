import MainFooter from '@/components/MainFooter'
import MainHeader from '@/components/MainHeader'
import React from 'react'

type OrganizationLayoutProps = {
    children: React.ReactNode
}

export default function OrganizationLayout({ children }: OrganizationLayoutProps) {
  return (
    <div>
        <MainHeader />
        {children}
        <MainFooter />
    </div>
  )
}
