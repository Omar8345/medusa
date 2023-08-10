import React from "react"
import IconTwitter from "@site/src/theme/Icon/Twitter"
import IconGitHub from "@site/src/theme/Icon/GitHub"
import IconDiscord from "@site/src/theme/Icon/Discord"
import IconLinkedIn from "@site/src/theme/Icon/LinkedIn"
import { SocialLink } from "@medusajs/docs"

type SocialLinksProps = {
  links?: SocialLink[]
} & React.HTMLAttributes<HTMLDivElement>

const SocialLinks: React.FC<SocialLinksProps> = ({ links = [] }) => {
  const socialIcons = {
    twitter: (
      <IconTwitter iconColorClassName="fill-medusa-icon-muted dark:fill-medusa-icon-muted-dark group-hover:fill-medusa-icon-subtle dark:group-hover:fill-medusa-icon-subtle-dark" />
    ),
    github: (
      <IconGitHub iconColorClassName="fill-medusa-icon-muted dark:fill-medusa-icon-muted-dark group-hover:fill-medusa-icon-subtle dark:group-hover:fill-medusa-icon-subtle-dark" />
    ),
    discord: (
      <IconDiscord iconColorClassName="fill-medusa-icon-muted dark:fill-medusa-icon-muted-dark group-hover:fill-medusa-icon-subtle dark:group-hover:fill-medusa-icon-subtle-dark" />
    ),
    linkedin: (
      <IconLinkedIn iconColorClassName="fill-medusa-icon-muted dark:fill-medusa-icon-muted-dark group-hover:fill-medusa-icon-subtle dark:group-hover:fill-medusa-icon-subtle-dark" />
    ),
  }

  return (
    <div className="flex items-center">
      {links.map((link) => (
        <a
          className="group ml-1 first:ml-0"
          href={link.href}
          key={link.type}
        >
          {socialIcons[link.type]}
        </a>
      ))}
    </div>
  )
}

export default SocialLinks
