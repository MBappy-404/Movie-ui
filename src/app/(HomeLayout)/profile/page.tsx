
import UserProfile from '@/components/modules/auth/profile/Userprofile'
import { getCurrentUser } from '@/services/AuthServices'
import React from 'react'

const ProfilePage = async() => {

  const user = await getCurrentUser();
  return (
    <div>
      <UserProfile userData={user} />
    </div>
  )
}

export default ProfilePage
