import clsx from 'clsx'

interface FormButtonProps {
  text: React.ReactNode
  type?: 'button' | 'submit'
  loading?: boolean
  className?: string
  onClick?: () => void
}

const FormButton: React.FC<FormButtonProps> = ({
  text,
  type = 'submit',
  loading = false,
  className,
  onClick,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading}
      className={clsx(
        `
        p-2 rounded-md font-bol d
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
