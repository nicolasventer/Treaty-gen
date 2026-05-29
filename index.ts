import { Project, ts } from "ts-morph";

// Create a project and add TypeScript source code
const project = new Project({
	tsConfigFilePath: "./tsconfig.json",
});
const sourceFile = project.getSourceFileOrThrow("./server.ts");

// Get the variable declaration
const variable = sourceFile.getVariableDeclarationOrThrow("api");

// Get the type of the variable
const type = variable.getType();

// Get the expanded structure of the type
const expandedType = type.getText(undefined, ts.TypeFormatFlags.NoTruncation);

// Write the expanded type to a file
Bun.write(
	"api.gen.ts",
	`import type { EdenFetchError, Treaty } from "@elysia/eden";

type TreatyResponse<T extends Record<number, unknown>> = Treaty.TreatyResponse<T>;
type ThrowHttpError = boolean | ((error: EdenFetchError<number, unknown>) => boolean);

export type Api = ${expandedType};`,
);

console.log("api.gen.ts generated successfully.");
