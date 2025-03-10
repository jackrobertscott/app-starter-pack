import {logout} from "@browser/utils-auth"
import {useTRPC} from "@browser/utils-trpc-context"
import {
  mdiAccountMultiple,
  mdiAccountPlus,
  mdiBellRing,
  mdiChartLine,
  mdiCog,
  mdiDelete,
  mdiExport,
  mdiLogout,
  mdiRefresh,
} from "@mdi/js"
import {useQuery} from "@tanstack/react-query"
import {useRef} from "react"
import {useNavigate} from "react-router-dom"
import {Button} from "./components/button-component"
import {DashboardCard} from "./components/dashboard-card-component"
import {Dropdown} from "./components/dropdown-component"
import {StatsCard} from "./components/stats-card-component"
import {UserList} from "./components/user-list-component"

export function App() {
  const trpc = useTRPC()
  const navigate = useNavigate()
  const listUsers = useQuery(trpc.userList.queryOptions())
  const headerRef = useRef<HTMLDivElement>(null)

  const userCount = listUsers.data?.length || 0
  const isLoading = listUsers.isLoading

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  const handleUserSelect = (userId: string) => {
    console.log(`User selected: ${userId}`)
    // Handle user selection
  }

  // Display a loading state if the data is being fetched
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-indigo-600 border-r-transparent border-b-indigo-600 border-l-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-lg font-semibold text-gray-700">Loading dashboard...</h2>
          <p className="text-gray-500 mt-1">Please wait while we prepare your dashboard</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div ref={headerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14">
            <h1 className="text-lg font-semibold text-gray-900">Dashboard</h1>

            <div className="flex items-center space-x-2">
              <Button variant="icon" iconPath={mdiBellRing} />
              <Button variant="icon" iconPath={mdiCog} />
              <Button
                variant="icon"
                iconPath={mdiLogout}
                onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        {/* Stats row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
          <StatsCard
            title="Total Users"
            value={userCount}
            iconPath={mdiAccountMultiple}
            accentColor="bg-indigo-600"
            trend={{value: 12, label: "vs last month"}}
          />

          <StatsCard
            title="Active Users"
            value={Math.round(userCount * 0.8)}
            iconPath={mdiAccountPlus}
            accentColor="bg-blue-600"
            trend={{value: 8, label: "vs last month"}}
          />

          <StatsCard
            title="Weekly Growth"
            value={`${userCount > 0 ? "5.2" : "0"}%`}
            iconPath={mdiChartLine}
            accentColor="bg-green-600"
            trend={{value: 2.1, label: "vs last week"}}
          />
        </div>

        {/* User list card */}
        <div className="mb-5">
          <DashboardCard
            title="Recent Users"
            iconPath={mdiAccountMultiple}
            accentColor="bg-indigo-600"
            action={
              <Dropdown
                label="Actions"
                buttonClassName="text-xs py-1 px-2"
                items={[
                  {
                    label: "Refresh",
                    onClick: () => listUsers.refetch(),
                    iconPath: mdiRefresh,
                  },
                  {
                    label: "Export",
                    onClick: () => console.log("Export clicked"),
                    iconPath: mdiExport,
                  },
                  {
                    label: "Delete",
                    onClick: () => console.log("Delete clicked"),
                    iconPath: mdiDelete,
                    disabled: true,
                  },
                ]}
              />
            }>
            <UserList
              users={listUsers.data || []}
              isLoading={listUsers.isLoading}
              onUserSelect={handleUserSelect}
            />

            <div className="mt-3 flex justify-end px-3 pb-1">
              <Button variant="outline" size="sm">
                View all users
              </Button>
            </div>
          </DashboardCard>
        </div>
      </main>
    </div>
  )
}
