import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import Home from 'pages/index'

describe('Homepage', () => {
  it('renders the Tree component', () => {
    render(<Home />)

    const tree = screen.getByRole('region', {
      name: /data tree/i,
    })

    expect(tree).toBeInTheDocument()
  })

  it('renders the Leaf details component', () => {
    render(<Home />)

    const details = screen.getByRole('region', {
      name: /leaf details/i,
    })

    expect(details).toBeInTheDocument()
  })

  it('renders contains theme Switch', () => {
    render(<Home />)

    const themeToggle = screen.getByRole('button', {
      name: /switch to (?:dark|light) mode/i,
    })

    expect(themeToggle).toBeInTheDocument()
  })
})
