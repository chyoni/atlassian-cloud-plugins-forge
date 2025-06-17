import Resolver from '@forge/resolver';
import { fetch } from '@forge/api';

const resolver = new Resolver();

resolver.define('getText', async (req) => {
  const result = await fetch("https://zenquotes.io/api/today");
  
  const data = await result.json();
  
  const quote = data[0].q;
  return quote;    
});

resolver.define('jsonplaceholder', async (req) => {
  const result = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await result.json();
  return users;
})

resolver.define('jsonplaceholderpost', async (req) => {
  const { title, body } = req.payload;

  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({title, body, userId: 1})
  })

  const newPost = await response.json();
  console.log(newPost);

  return newPost.title;
})

export const handler = resolver.getDefinitions();
