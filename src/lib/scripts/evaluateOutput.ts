export default function evaluateOutput(code: string) {
	code = code.replaceAll(/console\.(log|dir|info|warn|error)/g, "$OUTPUT.push");
	code = "const $OUTPUT = [];\n" + code + "\n$OUTPUT;";
	try {
		const result: unknown[] = eval(code);
		return result.map(v => "> " + repr(v)).join("\n");
	} catch (error) {
		return (error as Error).name + ": " + (error as Error).message;
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
