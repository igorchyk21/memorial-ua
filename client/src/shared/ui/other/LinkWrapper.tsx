"use client";

import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { AnchorHTMLAttributes, HTMLAttributes, ReactNode } from "react";

type LinkWrapperProps = Omit<NextLinkProps, "href"> &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof NextLinkProps> & {
    href?: NextLinkProps["href"] | null; // робимо href опціональним
    children: ReactNode;
  };

const LinkWrapper = ({ href, children, ...rest }: LinkWrapperProps) => {
  if (!href) {
    const spanProps = rest as unknown as HTMLAttributes<HTMLSpanElement>;
    return <span {...spanProps}>{children}</span>;
  }

  return (
    <NextLink href={href} {...rest}>
      {children}
    </NextLink>
  );
}


export default LinkWrapper;