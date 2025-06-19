import Resolver from '@forge/resolver';
import { route, asUser } from '@forge/api';

const resolver = new Resolver();

resolver.define('getContent', async ({ payload }) => {
  const response = await asUser().requestConfluence(route`/wiki/api/v2/pages/${payload.contentId}?body-format=atlas_doc_format`);

  if (!response.ok) {
    const err = `Error while getContent with contentId ${payload.contentId}: ${response.status} ${response.statusText}`;
    console.error(err);
    throw new Error(err);
  }

  return await response.json();
});

export const handler = resolver.getDefinitions();
