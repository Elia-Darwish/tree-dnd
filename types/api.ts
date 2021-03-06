type TreeData = Array<Node | Leaf>

interface Node {
  label: string
  children: Array<Node | Leaf>
}

interface Leaf {
  id: string
  label: string
}

function isNode(item: Node | Leaf): item is Node {
  return item.hasOwnProperty('children')
}

interface LeafInfo {
  id: string
  createdAt: string
  createdBy: string
  lastModifiedAt: string
  lastModifiedBy: string
  description: string
}

export type { TreeData, Node, Leaf, LeafInfo }
export { isNode }
