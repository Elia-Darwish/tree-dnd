import '@testing-library/jest-dom'
import { act, render, screen, waitFor, within, fireEvent } from '@testing-library/react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'

import type { Node, Leaf } from 'types/api'
import { isNode } from 'types/api'
import { Tree } from 'components/Tree'

const input = [
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
    return res(ctx.json(input))
  }),
)

beforeAll(() => server.listen())
afterAll(() => server.close())

describe('Drag and Drop', () => {
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

    testNodes(input, tree)
  })

  it('changes the tree structure when a node is dragged and dropped in another location', async () => {
    render(<Tree />)
    const tree = screen.getByRole('region', {
      name: /data tree/i,
    })

    await waitFor(() => expect(tree).toHaveAttribute('aria-busy', 'false'))

    const ul = tree.querySelector('ul')

    if (!ul) {
      throw new Error('Could not find ul')
    }

    expect(ul).toBeInTheDocument()
    expect(ul.childElementCount).toBe(2)

    const sourceParentNode = screen.getByRole('listitem', {
      name: 'img.ly',
    })

    const sourceNode = within(sourceParentNode).getByRole('listitem', {
      name: 'Workspace A',
    })

    const source = sourceNode.querySelector('div > div')

    const targetNode = screen.getByRole('listitem', {
      name: '9elements',
    })

    const target = targetNode.querySelector('div > div')

    if (!source || !target) {
      throw new Error('Could not find source or target')
    }

    jest.spyOn(target, 'getBoundingClientRect').mockImplementation(() => ({
      x: 0,
      y: 0,
      width: 0,
      height: 50,
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      toJSON() {},
    }))

    // ClientX and ClientY are undefined when using fireEvent.dragOver ?!
    // fireEvent.dragOver(target, { clientX: 10, clientY: 10 })
    await act(() => {
      target.dispatchEvent(new MouseEvent('dragover', { bubbles: true, clientX: 10, clientY: 10 }))
    })

    await act(() => {
      fireEvent.dragEnd(source)
    })

    function testNode(node: Node | Leaf, element: HTMLElement) {
      const nodeElement = within(element).getByRole('listitem', {
        name: node.label,
      })

      expect(nodeElement).toBeInTheDocument()
    }

    expect(ul.childElementCount).toBe(3)
  })
})
