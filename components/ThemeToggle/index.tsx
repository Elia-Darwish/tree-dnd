import { useEffect, useState } from 'react'

import styles from './styles.module.css'

import { Moon, Sun } from 'components/icons'

function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  function toggleColorTheme() {
    setTheme((current) => (current === 'light' ? 'dark' : 'light'))
  }

  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }
  }, [theme])

  return (
    <button
      className={styles.toggle}
      aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
      onClick={toggleColorTheme}
    >
      <Moon data-visible={theme === 'light'} data-direction="left" />
      <Sun data-visible={theme === 'dark'} data-direction="right" />
    </button>
  )
}

export { ThemeToggle }
