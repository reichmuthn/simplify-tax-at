import type { PlopTypes } from "@turbo/gen";

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  plop.setGenerator("entity:adminUi", {
    description: "Adds basic admin forms and tables for an entity",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is the name of the entity?",
      },
      {
        type: "checkbox",
        message: "Which ui elements should be generated?",
        name: "uiElements",
        choices: [
          {
            name: "adminForm",
            value: {
              path: "src/entities/{{name}}s/forms/admin/form.tsx",
              templateFile: "templates/adminForm.hbs",
            },
          },
          {
            name: "adminFormActions",
            value: {
              path: "src/entities/{{name}}s/forms/admin/actions.ts",
              templateFile: "templates/adminFormActions.hbs",
            },
          },
          {
            name: "adminTable",
            value: {
              path: "src/entities/{{name}}s/tables/admin/table.tsx",
              templateFile: "templates/adminTable.hbs",
            },
          },
          {
            name: "adminTableClientActions",
            value: {
              path: "src/entities/{{name}}s/tables/admin/clientActions.ts",
              templateFile: "templates/adminTableClientActions.hbs",
            },
          },
          {
            name: "adminTableColumns",
            value: {
              path: "src/entities/{{name}}s/tables/admin/columns.tsx",
              templateFile: "templates/adminTableColumns.hbs",
            },
          },
          {
            name: "adminTableDeleteDialog",
            value: {
              path: "src/entities/{{name}}s/tables/admin/deleteDialog.tsx",
              templateFile: "templates/adminTableDeleteDialog.hbs",
            },
          },
          {
            name: "adminTableFloatingBar",
            value: {
              path: "src/entities/{{name}}s/tables/admin/floatingBar.tsx",
              templateFile: "templates/adminTableFloatingBar.hbs",
            },
          },
          {
            name: "adminTableSheet",
            value: {
              path: "src/entities/{{name}}s/tables/admin/sheet.tsx",
              templateFile: "templates/adminTableSheet.hbs",
            },
          },
          {
            name: "adminTableToolbar",
            value: {
              path: "src/entities/{{name}}s/tables/admin/toolbar.tsx",
              templateFile: "templates/adminTableToolbar.hbs",
            },
          },
          {
            name: "adminTableView",
            value: {
              path: "src/entities/{{name}}s/tables/admin/view.tsx",
              templateFile: "templates/adminTableView.hbs",
            },
          },
        ],
        validate(answer) {
          if (answer.length === 0) {
            return "You must choose at least one ui element.";
          }

          return true;
        },
      },
    ],
    actions: (data) => {
      const actions: PlopTypes.ActionType[] = data?.uiElements?.map(
        (uiElement: { path: string; templateFile: string }) => ({
          type: "add",
          force: true,
          ...uiElement,
        }),
      );

      return actions;
    },
  });
}
