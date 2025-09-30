import { ReactNode } from "react"

export type CommonComponentProps = {
    className?: string
    id?: string
    style?: React.CSSProperties
    onClick?: React.MouseEventHandler<HTMLElement>
    }

export type CommonComponentChildren = {
    children: ReactNode;
}