type BadgeVariant = 'default' | 'success' | 'error' | 'warning' | 'info'
type BadgeColor = 'gray' | 'red' | 'green' | 'yellow' | 'blue'

// map of variant to color
const variantToColor: Record<BadgeVariant, BadgeColor> = {
  default: 'gray',
  success: 'green',
  error: 'red',
  warning: 'yellow',
  info: 'blue',
}

type BadgeProps = {
  children: React.ReactNode
  variant: BadgeVariant
}

export function Badge({ children, variant }: BadgeProps) {
  const color = variantToColor[variant]
  return <div className={`px-2 py-1 bg-${color}-100 rounded-md text-${color}-500`}>{children}</div>
}