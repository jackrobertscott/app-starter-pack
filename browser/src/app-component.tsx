import {trpc} from "@browser/utils-trpc-client"
import {TypeofUser} from "@shared/schemas-user"
import {useEffect, useState} from "react"

export function App() {
  const [users, setUsers] = useState<TypeofUser[]>([])

  useEffect(() => {
    trpc.userList.query().then(setUsers)
  }, [])

  return (
    <div className="text-2xl p-4">
      User List
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  )
}
