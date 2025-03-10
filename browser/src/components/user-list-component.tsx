import {mdiEmail, mdiOpenInNew} from "@mdi/js"
import {UserPublic} from "@shared/schemas-user"
import {Button} from "./button-component"
import {Icon} from "./icon-component"
import {UserAvatar} from "./user-avatar-component"

type UserListProps = {
  users: UserPublic[]
  isLoading?: boolean
  onUserSelect?: (userId: string) => void
}

function UserItem({user, onSelect}: {user: UserPublic; onSelect?: () => void}) {
  const displayName =
    user.firstName && user.lastName
      ? `${user.firstName} ${user.lastName}`
      : user.email.split("@")[0]

  return (
    <div className="flex items-center py-2.5 px-3 group">
      <UserAvatar
        name={
          user.firstName && user.lastName
            ? `${user.firstName} ${user.lastName}`
            : undefined
        }
        size="sm"
      />
      <div className="ml-2 flex-1 min-w-0">
        <h4 className="font-medium text-sm truncate">{displayName}</h4>
        <div className="flex items-center text-xs text-gray-500">
          <Icon path={mdiEmail} size={12} className="mr-1" />
          <span className="truncate">{user.email}</span>
        </div>
      </div>
      <div className="hidden group-hover:flex items-center">
        <Button
          variant="icon"
          size="sm"
          iconPath={mdiOpenInNew}
          onClick={() => {
            onSelect?.()
          }}
          aria-label={`View details for ${displayName}`}
        />
      </div>
      <div className="text-xs text-gray-400 ml-2">
        {user.createdAt
          ? new Date(user.createdAt).toLocaleDateString(undefined, {
              month: "short",
              day: "numeric",
            })
          : "N/A"}
      </div>
    </div>
  )
}

export function UserList({
  users,
  isLoading = false,
  onUserSelect,
}: UserListProps) {
  if (isLoading) {
    return (
      <div className="animate-pulse">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="flex items-center py-2.5 px-3 border-b border-gray-100">
            <div className="bg-gray-200 rounded-full w-8 h-8 mr-2"></div>
            <div className="flex-1 min-w-0">
              <div className="h-3.5 bg-gray-200 rounded w-1/3 mb-1.5"></div>
              <div className="h-2.5 bg-gray-200 rounded w-1/4"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (users.length === 0) {
    return (
      <div className="text-center py-6">
        <p className="text-gray-500 text-sm">No users found</p>
      </div>
    )
  }

  return (
    <ul className="divide-y divide-gray-100" aria-label="Users">
      {users.map((user) => (
        <li
          key={user.id}
          className="cursor-pointer hover:bg-gray-50 outline-none focus:bg-indigo-50 focus:outline-none"
          onClick={() => onUserSelect?.(user.id)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault()
              onUserSelect?.(user.id)
            }
          }}
          role="button"
          tabIndex={0}
          aria-label={`User ${
            user.firstName && user.lastName
              ? `${user.firstName} ${user.lastName}`
              : user.email.split("@")[0]
          }`}>
          <UserItem user={user} onSelect={() => onUserSelect?.(user.id)} />
        </li>
      ))}
    </ul>
  )
}
