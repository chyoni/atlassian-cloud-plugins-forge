import Resolver from '@forge/resolver';
import {kvs} from '@forge/kvs';

const resolver = new Resolver();

function termKey(term) {
    const safeTerm = term
        .replace(/[^a-zA-Z0-9:._\s-#]/g, '') // 허용되지 않는 문자 제거
        .replace(/\s+/g, '-') // 공백을 하이픈으로
        .trim();

    return `term-${safeTerm}`;
}

async function getDefinition(term) {
    const value = await kvs.get(termKey(term));
    return value ? value.definition : "";
}

resolver.define('getDefinitions', async (req) => {
    const pendingDefinitions = req.payload.terms.map(term => getDefinition(term));
    return await Promise.all(pendingDefinitions);
})

resolver.define('saveDefinition', async (req) => {
    const {term, definition} = req.payload;
    await kvs.set(termKey(term), {term, definition});
})

resolver.define('removeDefinition', async (req) => {
    let term = req.payload.term;
    await kvs.delete(termKey(term));
})

export const handler = resolver.getDefinitions();
