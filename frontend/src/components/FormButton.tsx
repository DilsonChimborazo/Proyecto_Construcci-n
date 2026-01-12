import clsx from 'clsx'

interface FormButtonProps {
  text: string
  type?: 'button' | 'submit'
  loading?: boolean
  className?: string
}

const FormButton: React.FC<FormButtonProps> = ({
  text,
  type = 'submit',
  loading = false,
  className,
}) => {
  return (
    <button
      type={type}
      disabled={loading}
      className={clsx(
        `
        w-full py-2 rounded-md font-bold
        bg-orange-400 hover:bg-orange-500
        text-white transition
        disabled:opacity-50
        `,
        className
      )}
    >
      {loading ? 'Procesando...' : text}
    </button>
  )
}

export default FormButton
