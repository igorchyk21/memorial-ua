'use client'

import { useState, useEffect, type CSSProperties } from 'react'
import { useTheme } from 'next-themes'
import type { CommonComponentProps } from '@/types/componentProps'
import Dropdown, { type DropdownProps } from 'react-bootstrap/Dropdown'
import { useTranslations } from 'next-intl'

type AlignType = DropdownProps['align']

interface ButtonThemeProps extends CommonComponentProps {
  ghostButton?: boolean
  dropdownMenuPosition?: AlignType
  dropdownMenuCentered?: boolean
  dropdownMenuOffset?: string
}
 
const ButtonTheme = ({
  ghostButton,
  dropdownMenuOffset,
  dropdownMenuPosition,
  dropdownMenuCentered = false,
  className,
  ...props
}: ButtonThemeProps) => {

  const t = useTranslations();
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme() 

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className={className}>
        <button
          type="button"
          className={`btn btn-icon btn-secondary rounded-circle animate-scale ${ghostButton ? 'btn-lg fs-lg bg-transparent border-0' : 'fs-base'}`}
        >
          <i className="ci-sun animate-target" />
        </button>
      </div>
    )
  }

  let themeIcon

  switch (theme) {
    case 'dark':
      themeIcon = 'moon'
      break
    case 'system':
      themeIcon = 'auto'
      break
    default:
      themeIcon = 'sun'
  }

  return ( 
    <Dropdown className={className}>
      <Dropdown.Toggle
        variant="secondary"
        className={`btn-icon rounded-circle animate-scale ${ghostButton ? 'btn-lg fs-lg bg-transparent border-0' : 'fs-base'}`}
        {...props} 
      >
        <i className={`ci-${themeIcon} animate-target`} />
      </Dropdown.Toggle>
      <Dropdown.Menu
        align={dropdownMenuPosition}
        className={dropdownMenuCentered ? ' start-50 translate-middle-x' : ''}
        style={
          {
            ...(dropdownMenuOffset && { '--cz-dropdown-spacer': dropdownMenuOffset }),
            '--cz-dropdown-min-width': '9rem',
          } as CSSProperties
        }
      >
        <Dropdown.Item
          as="button"
          data-bs-theme-value="light"
          active={theme === 'light'}
          onClick={() => setTheme('light')}
        >
          <i className="ci-sun fs-base me-2" />
          <span className="theme-label">{t('theme.light')}</span>
          <i className="item-active-indicator ci-check ms-auto" />
        </Dropdown.Item>
        <Dropdown.Item
          as="button"
          data-bs-theme-value="dark"
          active={theme === 'dark'}
          onClick={() => setTheme('dark')}
        >
          <i className="ci-moon fs-base me-2" />
          <span className="theme-label">{t('theme.dark')}</span> 
          <i className="item-active-indicator ci-check ms-auto" />
        </Dropdown.Item>
        <Dropdown.Item
          as="button"
          data-bs-theme-value="auto"
          active={theme === 'system'}
          onClick={() => setTheme('system')}
        >
          <i className="ci-auto fs-base me-2" />
          <span className="theme-label">{t('theme.auto')}</span>
          <i className="item-active-indicator ci-check ms-auto" />
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default ButtonTheme
