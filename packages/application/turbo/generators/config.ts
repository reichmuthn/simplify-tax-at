import type { PlopTypes } from "@turbo/gen";

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  plop.setGenerator("entity:adminRequests", {
    description: "Adds basic admin queries and commands for an entity",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is the name of the entity?",
      },
      {
        type: "checkbox",
        message: "Which requests should be generated?",
        name: "requests",
        choices: [
          {
            name: "createCommand",
            value: {
              path: "src/entities/{{name}}s/commands/create{{pascalCase name}}/command.ts",
              templateFile: "templates/createCommand.hbs",
            },
          },
          {
            name: "createSchema",
            value: {
              path: "src/entities/{{name}}s/commands/create{{pascalCase name}}/schemas.ts",
              templateFile: "templates/createSchema.hbs",
            },
          },
          {
            name: "deleteCommand",
            value: {
              path: "src/entities/{{name}}s/commands/delete{{pascalCase name}}/command.ts",
              templateFile: "templates/deleteCommand.hbs",
            },
          },
          {
            name: "updateCommand",
            value: {
              path: "src/entities/{{name}}s/commands/update{{pascalCase name}}/command.ts",
              templateFile: "templates/updateCommand.hbs",
            },
          },
          {
            name: "getAdminItemsQuery",
            value: {
              path: "src/entities/{{name}}s/queries/getAdmin{{pascalCase name}}Items/query.ts",
              templateFile: "templates/getAdminItemsQuery.hbs",
            },
          },
          {
            name: "getAdminItemsSchema",
            value: {
              path: "src/entities/{{name}}s/queries/getAdmin{{pascalCase name}}Items/schemas.ts",
              templateFile: "templates/getAdminItemsSchema.hbs",
            },
          },
        ],
        validate(answer) {
          if (answer.length === 0) {
            return "You must choose at least one request.";
          }

          return true;
        },
      },
    ],
    actions: (data) => {
      const actions: PlopTypes.ActionType[] = data?.requests?.map(
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
