import {trpc} from "@browser/utils-trpc-client"
import {TypeofUser, userSchema} from "@shared/schemas-user"
import {useEffect, useState} from "react"

export function App() {
  const [userList, setUserList] = useState<TypeofUser[]>([])

  useEffect(() => {
    trpc.userList.query().then((i) => {
      setUserList(i.map((j) => userSchema().parse(j)))
    })
  }, [])

  return (
    <div className="text-2xl p-4">
      <h1 className="text-3xl font-bold">Users</h1>
      <ul>
        {userList.map((user) => (
          <li key={user.id}>
            <div className="text-lg">{user.email}</div>
            <div className="text-sm text-gray-500">
              Created: {user.createdAt?.toLocaleString()}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
