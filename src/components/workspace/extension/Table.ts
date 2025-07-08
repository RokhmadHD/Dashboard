// extensions/CustomTableCell.ts
import { mergeAttributes, Node } from "@tiptap/core";
import TableHeaderlNodeView from "@/components/workspace/extension/TableHeaderView";
import TableCellNodeView from "@/components/workspace/extension/TableCellView";
import { ReactNodeViewRenderer } from "@tiptap/react";
import Table, { createColGroup } from "@tiptap/extension-table";
import TableView from "./TableView";
import { DOMOutputSpec } from "prosemirror-model";
import TableRowView from "./TableRowView";

export const CustomTableCell = Node.create({
  name: "customTableCell",
  group: "tableCell",
  content: "block+",
  tableRole: "cell",
  isolating: true,

  addAttributes() {
    return {
      colspan: {
        default: 1,
      },
      rowspan: {
        default: 1,
      },
      colwidth: {
        default: null,
        parseHTML: (element) => {
          const colwidth = element.getAttribute("colwidth");
          const value = colwidth
            ? colwidth.split(",").map((width) => parseInt(width, 10))
            : null;

          return value;
        },
      },
    };
  },
  parseHTML() {
    return [{ tag: "td" }];
  },

  renderHTML({ HTMLAttributes }) {
    return ["td", HTMLAttributes, 0];
  },

  addNodeView() {
    return ReactNodeViewRenderer(TableCellNodeView, { as: "td" });
  },
});

export const CustomTableHeader = Node.create({
  name: "customTableHeader",
  group: "tableHeader",
  content: "block+",
  tableRole: "header_cell",
  isolating: true,
  addAttributes() {
    return {
      colspan: {
        default: 1,
      },
      rowspan: {
        default: 1,
      },
      colwidth: {
        default: null,
        parseHTML: (element) => {
          const colwidth = element.getAttribute("colwidth");
          const value = colwidth
            ? colwidth.split(",").map((width) => parseInt(width, 10))
            : null;

          return value;
        },
      },
    };
  },
  parseHTML() {
    return [{ tag: "th" }];
  },

  renderHTML({ HTMLAttributes }) {
    return ["th", HTMLAttributes, 0];
  },

  addNodeView() {
    return ReactNodeViewRenderer(TableHeaderlNodeView, { as: "th" });
  },
});

export const CustomTableRow = Node.create({
  name: "tableRow",

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  content: "(tableCell | tableHeader)*",

  tableRole: "row",

  parseHTML() {
    return [{ tag: "tr" }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "tr",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0,
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(TableRowView, { as: "div" });
  },
  
});

const CustomTable = Table.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      class: {
        default: null,
        // Customize the HTML parsing
        parseHTML: (element) => element.getAttribute("class"),
        // … and customize the HTML rendering
        renderHTML: (attributes) => {
          if (attributes.class) {
            return {
              class: attributes.class,
            };
          }
        },
      },
    };
  },
  parseHTML() {
    return [{ tag: "table" }];
  },
  renderHTML({ node, HTMLAttributes }) {
    const { colgroup, tableWidth, tableMinWidth } = createColGroup(
      node,
      this.options.cellMinWidth
    );

    const table: DOMOutputSpec = [
      "table",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        style: tableWidth
          ? `width: ${tableWidth}`
          : `min-width: ${tableMinWidth}`,
      }),
      colgroup,
      ["tbody", 0],
    ];

    return table;
  },
  addNodeView() {
    return ReactNodeViewRenderer(TableView);
  },
  
});

export default CustomTable;
