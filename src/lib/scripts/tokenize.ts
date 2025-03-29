export type Token<T extends string> = { type: T | "none"; value: string };

/**
 * Divide uma string em *tokens* aplicando expresões regulares em série, onde cada *token* é um
 * objeto com um `type` que identifica a expressão regular que passou e um `value` que contém a
 * parte da string que correspondeu.
 * @param string A string a ser desestruturada.
 * @param rules Um objeto que mapeia nomes identificadores para expressões regulares.
 * @returns Uma lista de *tokens*.
 */
export default function tokenize<T extends string>(string: string, rules: Record<T, RegExp>) {
	let tokens: Token<T>[] = [{ type: "none", value: string }];

	for (const [type, regExp] of Object.entries<RegExp>(rules)) {
		tokens = tokens.flatMap(token => applyRule(token, regExp, type as T));
	}
	return tokens;
}

function applyRule<T extends string>(token: Token<T>, regExp: RegExp, type: T): Token<T>[] {
	if (token.type !== "none") {
		return [token];
	}
	const string = token.value;
	const match = string.match(regExp);
	if (match === null) {
		return [token];
	}
	const index = match.index!;
	const before = string.slice(0, index);
	const after = string.slice(index + match[0].length);
	return [
		{ type: "none", value: before },
		{ type, value: match[0] },
		...applyRule({ type: "none", value: after }, regExp, type),
	];
}
