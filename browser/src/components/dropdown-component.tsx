import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react"
import {mdiChevronDown} from "@mdi/js"
import {Fragment, ReactNode} from "react"
import {Icon} from "./icon-component"

type DropdownItem = {
  label: string
  onClick: () => void
  iconPath?: string
  disabled?: boolean
}

type DropdownProps = {
  label: string
  items: DropdownItem[]
  buttonClassName?: string
  menuClassName?: string
  icon?: string
  children?: ReactNode
}

export function Dropdown({
  label,
  items,
  buttonClassName = "",
  menuClassName = "",
  icon = mdiChevronDown,
  children,
}: DropdownProps) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton
          className={`inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${buttonClassName}`}>
          {label}
          {children}
          <Icon path={icon} className="w-5 h-5 ml-2 -mr-1" aria-hidden="true" />
        </MenuButton>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95">
        <MenuItems
          className={`absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${menuClassName}`}>
          <div className="py-1">
            {items.map((item, index) => (
              <MenuItem key={index} disabled={item.disabled}>
                {({active}) => (
                  <button
                    onClick={item.onClick}
                    disabled={item.disabled}
                    className={`${
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                    } ${
                      item.disabled ? "opacity-50 cursor-not-allowed" : ""
                    } group flex w-full items-center px-4 py-2 text-sm`}>
                    {item.iconPath && (
                      <Icon
                        path={item.iconPath}
                        className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                      />
                    )}
                    {item.label}
                  </button>
                )}
              </MenuItem>
            ))}
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  )
}
