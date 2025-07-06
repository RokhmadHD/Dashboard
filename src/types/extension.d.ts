import '@tiptap/core'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    alertBox: {
      insertAlertBox: (variant: string) => ReturnType
    },
    imageBox: {
      insertImageBox: (options: {
        src:string;
        alt?:string;
        caption?:string;
      }) => ReturnType
    }
  }
}

