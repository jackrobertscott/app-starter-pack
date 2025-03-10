import {RefObject} from "react"
import {useTextField} from "react-aria"

type TextFieldProps = {
  label: string
  placeholder: string
  value: string
  onChange: (value: string) => void
  type?: string
  inputRef: RefObject<HTMLInputElement | null>
}

export function TextField({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  inputRef,
}: TextFieldProps) {
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
    <div>
      <label
        {...labelProps}
        className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        ref={inputRef}
        {...inputProps}
        required
        className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm shadow-sm shadow-stone-50"
        placeholder={placeholder}
      />
    </div>
  )
}