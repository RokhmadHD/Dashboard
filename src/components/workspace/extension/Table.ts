import { Node, mergeAttributes } from '@tiptap/core'

export const CustomTable = Node.create({
  name: 'table',

  group: 'block',
  content: 'customTableRow+',
  isolating: true,

  parseHTML() {
    return [
      {
        tag: 'table[data-type="custom-table"]',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['table', mergeAttributes(HTMLAttributes, { 'data-type': 'custom-table', class: 'beauty-table' }), ['tbody', 0]]
  },

  addCommands() {
    return {
      insertTable: ({ rows, cols }) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            content: [
              {
                type: 'customTableRow',
                content: new Array(rows).fill({ type: 'customTableHeader', content: [{ type: 'text', text: 'Header 1' }] })
              },
              {
                type: 'customTableRow',
                content: new Array(cols).fill({ type: 'customTableCell', content: [{ type: 'text', text: 'Cell 1' }] }),
              },
            ],
          })
        },
    }
  },
})

export const CustomTableRow = Node.create({
  name: 'customTableRow',

  content: '(customTableCell | customTableHeader)+',
  tableRole: 'row',
  parseHTML() {
    return [{ tag: 'tr' }]
  },
  renderHTML() {
    return ['tr', 0]
  },
})

export const CustomTableCell = Node.create({
  name: 'customTableCell',

  content: 'inline*',
  isolating: true,
  parseHTML() {
    return [{ tag: 'td' }]
  },
  renderHTML({ HTMLAttributes }) {
    return ['td', mergeAttributes(HTMLAttributes, { class: 'border px-4 py-2' }), 0]
  },
})

export const CustomTableHeader = Node.create({
  name: 'customTableHeader',

  content: 'inline*',
  isolating: true,
  parseHTML() {
    return [{ tag: 'th' }]
  },
  renderHTML({ HTMLAttributes }) {
    return ['th', mergeAttributes(HTMLAttributes, { class: 'border px-4 py-2 font-bold bg-gray-100' }), 0]
  },
})
