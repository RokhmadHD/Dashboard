import { Node, mergeAttributes } from '@tiptap/core'

export const ImageBox = Node.create({
    name: 'imageBox',

    group: 'block',
    atom: true,
    selectable: true,
    draggable: true,

    addAttributes() {
        return {
            src: {
                default: null,
            },
            alt: {
                default: '',
            },
            caption: {
                default: '',
            },
        }
    },

    parseHTML() {
        return [
            {
                tag: 'img[data-type="imageBox"]',
            },
        ]
    },

    renderHTML({ HTMLAttributes }) {
        const children = [
            ['img', { src: HTMLAttributes.src, alt: HTMLAttributes.alt }],
        ]   

        if (HTMLAttributes.caption) {
            children.push(['figcaption', {class: 'relative z-50',contentEditable: true  }, HTMLAttributes.caption])
        }

        return ['figure', mergeAttributes(HTMLAttributes, { 'data-type': 'imageBox', }), ...children]
    },


    addCommands() {
        return {
            insertImageBox:
                (options: { src: string; alt?: string, caption?: string }) =>
                    ({ commands }) => {
                        return commands.insertContent({
                            type: this.name,
                            attrs: options,
                        })
                    },
        }
    },
})
