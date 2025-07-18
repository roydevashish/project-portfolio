import { auth, currentUser } from '@clerk/nextjs/server'

export default async function Page() {
  const { userId } = await auth()

  if (!userId) {
    return("");
  }

  const user = await currentUser()
  return <div>Welcome, {user?.firstName}!</div>
}