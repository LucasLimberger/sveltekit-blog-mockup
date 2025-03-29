/**
 * Calcula os valores emitodos ao console pelo código.
 * @param code O código a ser executado.
 * @returns Os valores emitidos ao console formatados como strings, ou uma mensagem de erro.
 */
export default function evaluateOutput(code: string) {
	code = code.replaceAll(/console\.(log|dir|info|warn|error)/g, "$OUTPUT.push");
	code = "const $OUTPUT = [];\n" + code + "\n$OUTPUT;";
	try {
		const result: unknown[] = eval(code);
		return result.map(repr);
	} catch (error) {
		const errorMessage = (error as Error).name + ": " + (error as Error).message;
		return [errorMessage];
	}
}

function repr(value: unknown): string {
	if (value instanceof Array) {
		return "[" + value.map(repr).join(", ") + "]";
	}
	if (typeof value === "number" && isNaN(value)) {
		return "NaN";
	}
	return JSON.stringify(value);
}
