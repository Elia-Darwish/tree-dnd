import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { act } from 'react-dom/test-utils'

import { ThemeToggle } from 'components/ThemeToggle'

describe('Theme Toggle', () => {
  it('render the Theme Toggle', () => {
    render(<ThemeToggle />)

    const toggle = screen.getByRole('button', {
      name: /switch to dark mode/i,
    })

    expect(toggle).toBeInTheDocument()
  })

  it('switches the theme when clicked', async () => {
    render(<ThemeToggle />)

    const toggle = screen.getByRole('button', {
      name: /switch to dark mode/i,
    })

    await act(() => userEvent.click(toggle))

    expect(toggle).toHaveAccessibleName(/switch to light mode/i)
    expect(document.body.classList).toContain('dark')
  })
})
