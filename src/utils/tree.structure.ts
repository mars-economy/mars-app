import BigNumber from 'bignumber.js'

type NODE_TYPE_CATEGORIES = 'categories'
type NODE_TYPE_OUTCOMES = 'outcomes'
type NODE_TYPE_PREDICTIONS = 'predictions'
type NODE_TYPE_MILESTONES = 'milestones'

type INodeTypes = NODE_TYPE_CATEGORIES | NODE_TYPE_MILESTONES | NODE_TYPE_PREDICTIONS | NODE_TYPE_OUTCOMES

interface IBaseNode {
  nodeType: INodeTypes;
  id: string
  name: string
  position: number
  parent: IBaseNode | null
  parentId: string | null
  children: Array<IBaseNode> | []

  getParent (): IBaseNode | null

  getChildren (uuid: string): IBaseNode | null

  getChildrenList (): Array<IBaseNode>

  addChildren (data: IBaseNode): IBaseNode
}

interface IPhasesTree {
  nodes: Array<IBaseNode>
}

class TreeNode implements IBaseNode {
  nodeType: INodeTypes
  id: string
  name: string
  position: number
  parent: IBaseNode | null
  parentId: string | null
  children: Array<IBaseNode> | []

  constructor (data) {
    this.nodeType = data.nodeType
    this.id = data.id
    this.name = data.name
    this.position = data.position
    this.parent = data.parent || null
    this.parentId = data.parentId || null
    this.children = []
  }

  getChildren (uuid: string): IBaseNode | null {
    return this.children.find(item => item.id === uuid) || null
  }

  getChildrenList (): Array<IBaseNode> {
    return this.children
  }

  getParent (): IBaseNode | null {
    return this.parent
  }

  setParent (data: IBaseNode | null): IBaseNode {
    this.parent = data
    return this
  }

  addChildren (children: IBaseNode): IBaseNode {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.children.push(children)
    return this
  }
}

export class Category extends TreeNode {
  description: string

  constructor (data, nodeType = 'categories') {
    data.nodeType = nodeType
    super(data)
    this.description = data.description
  }
}

export class Milestone extends TreeNode {
  description: string
  dueDate: number
  predictorsNumber: number
  status: 'Current' | 'Future' | 'Historical'

  constructor (data, nodeType = 'milestones') {
    data.nodeType = nodeType
    data.parentId = data.category.id
    super(data)
    this.description = data.description
    this.dueDate = data.dueDate
    this.predictorsNumber = data.predictorsNumber
    this.status = data.status
  }
}

export class Prediction extends TreeNode {
  description: string
  dueDate: number
  predictorsNumber: number
  state: 'Closed' | 'Open' | 'Settlement'
  token: string
  totalStakeAmount: BigNumber

  constructor (data, nodeType = 'predictions') {
    data.nodeType = nodeType
    data.parentId = data.milestone.id
    super(data)
    this.description = data.description
    this.dueDate = data.dueDate
    this.predictorsNumber = data.predictorsNumber
    this.state = data.state
    this.token = data.token
    this.totalStakeAmount = new BigNumber(0)
  }

  addChildren (children: IBaseNode): IBaseNode {
    this.totalStakeAmount = this.totalStakeAmount.plus(new BigNumber((children as Outcome).stakedAmount))
    return super.addChildren(children)
  }
}

export class Outcome extends TreeNode implements IBaseNode {
  stakedAmount: BigNumber

  constructor (data, nodeType = 'outcomes') {
    data.nodeType = nodeType
    data.parentId = data.prediction.id
    super(data)
    this.stakedAmount = data.stakedAmount
  }
}

export class PhasesTree implements IPhasesTree {
  nodes: Array<IBaseNode>

  constructor (data) {
    this.nodes = this.createTree(data)
  }

  getRootNodes (): Array<IBaseNode> {
    return this.nodes.filter(item => item.nodeType === 'categories')
  }

  createNode (type: INodeTypes, data: unknown): TreeNode {
    let node: TreeNode
    switch (type) {
      case 'categories':
        node = new Category(data)
        break
      case 'milestones':
        node = new Milestone(data)
        break
      case 'predictions':
        node = new Prediction(data)
        break
      case 'outcomes':
        node = new Outcome(data)
        break
    }
    return node
  }

  createTree (data): Array<IBaseNode> {
    try {
      const nodes: Array<TreeNode> = []
      Object.keys(data).forEach(item => {
        data[item].forEach(nodeData => {
          const node = this.createNode(item as INodeTypes, nodeData)
          nodes.push(node)
          if (node.parentId) {
            const parentNode = nodes.find(item => item.id === node.parentId)
            if (parentNode) {
              node.setParent(parentNode)
              parentNode.addChildren(node)
            }
          }
        })
      })
      return nodes
    } catch (e) {
      console.debug(e)
      return []
    }
  }
}
