import {useTRPC} from "@browser/utils-trpc-context"
import {useQuery} from "@tanstack/react-query"

export function App() {
  const trpc = useTRPC()
  const listUsers = useQuery(trpc.userList.queryOptions())

  return (
    <div className="text-2xl p-4">
      <h1 className="text-3xl font-bold">Users</h1>
      <ul>
        {listUsers.data?.map((user) => (
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
