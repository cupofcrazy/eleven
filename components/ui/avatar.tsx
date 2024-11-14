import Image from "next/image";
import cn from "classnames"

type AvatarProps = {

} & React.ComponentProps<typeof Image>

export function Avatar(props: AvatarProps) {
  return <Image {...props} className={cn("rounded-full", props.className)} width={32} height={32} />
}