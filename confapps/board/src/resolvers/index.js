import Resolver from '@forge/resolver';
import api, {route} from '@forge/api';
import kvs, {WhereConditions} from "@forge/kvs";

const resolver = new Resolver();

const createKey = (accountId, title, id) => {
    const safeTitle = title
        .replace(/[^a-zA-Z0-9:._\s-#]/g, '') // 허용되지 않는 문자 제거
        .replace(/\s+/g, '-') // 공백을 하이픈으로
        .trim();

    return `article:${accountId}:${safeTitle}:${id}`;
}

resolver.define('findCurrentUser', async (req) => {
    const response = await api.asUser().requestConfluence(route`/wiki/rest/api/user/current`);
    if (!response.ok) {
        throw new Error('Failed to fetch current user');
    }
    return await response.json();
});

resolver.define('findAllArticles', async (req) => {
    const result = await kvs.query()
        .where('key', WhereConditions.beginsWith('article:'))
        .limit(100)
        .getMany();

    return result.results.map(r => r.value);
})

resolver.define('saveArticle', async (req) => {
    const {id, title, content, accountId} = req.payload;
    await kvs.set(createKey(accountId, title, id), {id, title, content, accountId});

    return {id, title, content, accountId};
})

resolver.define('deleteArticle', async (req) => {
    const {article} = req.payload;
    await kvs.delete(createKey(article.accountId, article.title, article.id));
})

export const handler = resolver.getDefinitions();
