import React from 'react'
import clsx from 'clsx'
import type { UseFormRegisterReturn } from 'react-hook-form'

type FieldType = 'input' | 'select' | 'textarea'

interface Option {
  label: string
  value: string | number
}

interface FormFieldProps {
  type?: FieldType
  inputType?: string
  placeholder?: string
  label?: string
  error?: string
  options?: Option[]

  register?: UseFormRegisterReturn
  className?: string
}

const FormField: React.FC<FormFieldProps> = ({
  type = 'input',
  inputType = 'text',
  placeholder,
  label,
  error,
  options = [],
  register,
  className,
}) => {
  const baseStyles = clsx(
    `
    w-full px-3 py-2 rounded-md
    bg-white/10
    text-gray-800
    placeholder:text-gray-400
    
    `,
    error
      ? 'border-red-500 focus:ring-red-500'
      : 'border-gray-300',
    className
  )

  return (
    <div className="w-full  mb-4">
      {label && (
        <label className="block mb-2 font-bold">
          {label}
        </label>
      )}

      {type === 'input' && (
        <input
          type={inputType}
          placeholder={placeholder}
          className={baseStyles}
          {...register}
        />
      )}

      {type === 'textarea' && (
        <textarea
          placeholder={placeholder}
          className={baseStyles}
          {...register}
        />
      )}

      {type === 'select' && (
        <select className={baseStyles} {...register}>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      )}

      {error && (
        <p className="mt-1 text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  )
}

export default FormField
