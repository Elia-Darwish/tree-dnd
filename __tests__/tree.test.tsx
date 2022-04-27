import '@testing-library/jest-dom'
import { act, render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { rest } from 'msw'
import { setupServer } from 'msw/node'

import type { Node, Leaf } from 'types/api'
import { isNode } from 'types/api'
import { Tree } from 'components/Tree'

const data = [
  {
    label: 'img.ly',
    children: [
      {
        label: 'Workspace A',
        children: [
          {
            id: 'imgly.A.1',
            label: 'Entry 1',
          },
        ],
      },
      {
        label: 'Workspace B',
        children: [
          {
            id: 'imgly.B.1',
            label: 'Entry 1',
          },
          {
            label: 'Entry 3',
            children: [
              {
                id: 'imgly.B.3.1',
                label: 'Sub-Entry 1',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    label: '9elements',
    children: [
      {
        label: 'Workspace A',
        children: [
          {
            id: '9e.A.1',
            label: 'Entry 1',
          },
        ],
      },
    ],
  },
]

const server = setupServer(
  rest.get('https://ubique.img.ly/frontend-tha/data.json', async (req, res, ctx) => {
    return res(ctx.json(data))
  }),
)

beforeAll(() => server.listen())
afterAll(() => server.close())

describe('Node Tree', () => {
  it('fetches the data from the api', async () => {
    render(<Tree />)
    const tree = screen.getByRole('region', {
      name: /data tree/i,
    })

    expect(tree).toHaveAttribute('aria-busy', 'true')

    await waitFor(() => expect(tree).toHaveAttribute('aria-busy', 'false'))
  })

  it('renders the tree according to the data Fetched', async () => {
    render(<Tree />)
    const tree = screen.getByRole('region', {
      name: /data tree/i,
    })

    await waitFor(() => expect(tree).toHaveAttribute('aria-busy', 'false'))

    function testNodes(nodes: Array<Node | Leaf>, element: HTMLElement) {
      nodes.forEach((node) => {
        const nodeElement = within(element).getByRole('listitem', {
          name: node.label,
        })

        expect(nodeElement).toBeInTheDocument()

        if (isNode(node)) {
          testNodes(node.children, nodeElement)
        }
      })
    }

    testNodes(data, tree)
  })

  it('selects the item with all children when a node item is clicked', async () => {
    render(<Tree />)
    const tree = screen.getByRole('region', {
      name: /data tree/i,
    })

    await waitFor(() => expect(tree).toHaveAttribute('aria-busy', 'false'))

    const node = data[0]
    const toggle = screen.getByRole('button', {
      name: new RegExp(node.label),
    })
    await act(() => userEvent.click(toggle))

    function testNode(node: Node, element: HTMLElement) {
      const listitem = within(element).getByRole('listitem', {
        name: node.label,
      })

      within(listitem).getByRole('button', {
        name: new RegExp(node.label),
      })

      node.children.forEach((child) => {
        if (isNode(child)) {
          testNode(child, listitem)
        }
      })
    }

    testNode(data[0], tree)
  })

  it('it renders an Error message when the data fetching fails', async () => {
    server.use(
      rest.get('https://ubique.img.ly/frontend-tha/data.json', async (req, res, ctx) => {
        return res(ctx.status(500), ctx.json({ message: 'something went wrong' }))
      }),
    )

    render(<Tree />)
    const tree = screen.getByRole('region', {
      name: /data tree/i,
    })

    await waitFor(() => expect(tree).toHaveAttribute('aria-busy', 'false'))

    const region = screen.getByRole('region', {
      name: /data tree/i,
    })

    const error = within(region).getByRole('alert')

    expect(error).toBeInTheDocument()
  })
})
