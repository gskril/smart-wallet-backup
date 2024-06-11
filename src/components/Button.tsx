import { cn } from '../lib/utils'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: string
  variant?: 'primary' | 'secondary'
}

export function Button({
  children,
  className,
  variant: _variant,
  ...props
}: Props) {
  const variant = _variant || 'primary'

  return (
    <button
      className={cn(
        'text-md w-full rounded-lg px-4 py-2 font-semibold transition-opacity hover:opacity-80',
        variant === 'primary' && 'bg-white text-black',
        variant === 'secondary' &&
          'border-custom-100 border bg-black text-white',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
