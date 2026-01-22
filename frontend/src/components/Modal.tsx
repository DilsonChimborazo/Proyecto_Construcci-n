import clsx from 'clsx'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  className?: string
}

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  className,
}: ModalProps) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50"
      />

      {/* Modal box */}
      <div
        className={clsx(
          `
          relative bg-white rounded-lg shadow-lg
          w-full max-w-lg p-6 z-50
          `,
          className
        )}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        {children}
      </div>
    </div>
  )
}

export default Modal
