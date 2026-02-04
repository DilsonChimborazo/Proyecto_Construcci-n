type Props = {
  value: number
  onChange?: (value: number) => void
  readonly?: boolean
}

const Rating = ({ value, onChange, readonly = false }: Props) => {
  return (
    <div className="flex gap-1">
      {[1,2,3,4,5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readonly}
          onClick={() => onChange?.(star)}
          className={`text-2xl ${
            star <= value ? 'text-yellow-400' : 'text-gray-300'
          }`}
        >
          ★
        </button>
      ))}
    </div>
  )
}

export default Rating
