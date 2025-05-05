import ManageContent from '@/components/Dashboardlayout/Content/ManageContent'
import { Metadata } from 'next';
import React from 'react'


export const metadata: Metadata = {
  title: "Conent Managenment | Movie Series",
  description: "this is admin dashboard.",
};


const ManageContentPage = () => {
  return (
    <div>
      <ManageContent/>
    </div>
  )
}

export default ManageContentPage
