import {mdiEmail, mdiLock} from "@mdi/js"
import {RefObject} from "react"
import {useTextField} from "react-aria"
import {Icon} from "./icon-component"

type TextFieldProps = {
  label: string
  placeholder: string
  value: string
  onChange: (value: string) => void
  type?: string
  inputRef: RefObject<HTMLInputElement | null>
  iconPath?: string
}

export function TextField({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  inputRef,
  iconPath,
}: TextFieldProps) {
  // Set default icon based on field type if not provided
  const defaultIconPath = type === "password" ? mdiLock : mdiEmail
  const fieldIcon = iconPath || defaultIconPath
  const {labelProps, inputProps} = useTextField(
    {
      label,
      value,
      onChange,
      type,
    },
    inputRef
  )

  return (
    <div className="relative">
      <label
        {...labelProps}
        className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon path={fieldIcon} size={20} color="#9ca3af" />
        </div>
        <input
          ref={inputRef}
          {...inputProps}
          required
          className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg 
                    text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 
                    focus:ring-indigo-500 focus:border-indigo-500 
                    transition duration-150 ease-in-out text-sm"
          placeholder={placeholder}
        />
      </div>
    </div>
  )
}