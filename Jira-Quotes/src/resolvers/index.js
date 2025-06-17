import Resolver from '@forge/resolver';
import { fetch } from '@forge/api';

const resolver = new Resolver();

resolver.define('getText', async (req) => {
  const result = await fetch("https://zenquotes.io/api/today");
  
  const data = await result.json();
  
  const quote = data[0].q;
  return quote;    
});

export const handler = resolver.getDefinitions();
