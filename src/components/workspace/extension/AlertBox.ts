import { Node, mergeAttributes } from "@tiptap/core"

export const AlertBox = Node.create({
    name: "alertBox",
    group: "block",
    content: "inline*",
    atom: false,

    addAttributes() {
        return {
            variant: {
                default: "info",
                parseHTML: (el) => el.getAttribute("data-variant"),
                renderHTML: (attrs) => ({
                    "data-variant": attrs.variant,
                }),
            },
        }
    },

    parseHTML() {
        return [{ tag: 'div[data-type="alertBox"]' }]
    },

    renderHTML({ node, HTMLAttributes }) {
        return [
            'div',
            mergeAttributes(HTMLAttributes, { 'data-type': 'alertBox' }),
            [
                'span',
                { contenteditable: 'false', class: 'font-semibold text-sm' },
                `🔔 ${node.attrs.variant.charAt(0).toUpperCase() + node.attrs.variant.slice(1)} Alert`,
            ],
            [
                'div',
                { contenteditable: 'true', class: 'mt-2' },
                0, // placeholder untuk child content
            ],
        ]
    },

    addCommands() {
        return {
            insertAlertBox:
                (variant: string = "info") =>
                    ({ commands }) => {
                        return commands.insertContent({
                            type: this.name,
                            attrs: { variant },
                            content: [{ type: "text", text: `message` }],
                        })
                    },
        }
    },
})
