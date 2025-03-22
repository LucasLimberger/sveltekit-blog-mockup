/**
 * Retorna a representação de um valor como string.
 * @param value O valor a ser representado.
 */
export default function repr(value: unknown): string {
	if (value instanceof Array) {
		return "[" + value.map(repr).join(", ") + "]";
	}
	if (typeof value === "number" && isNaN(value)) {
		return "NaN";
	}
	return JSON.stringify(value);
}
