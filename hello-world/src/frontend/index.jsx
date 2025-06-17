import React, { useEffect, useState } from 'react';
import ForgeReconciler, { Text, useProductContext } from '@forge/react';
import { invoke, requestJira } from '@forge/bridge';

// Current Jira instance REST API 
const fetchCommentsForIssue = async (issueId) => {
  const res = await requestJira(`/rest/api/3/issue/${issueId}/comment`);
  const data = await res.json();
  return data.comments;
}

const App = () => {
  const context = useProductContext(); // 현재 Context 정보 가져오기

  const [comments, setComments] = useState();
  const [today, setToday] = useState();
  const [users, setUsers] = useState();
  const [post, setPost] = useState();

  useEffect(() => {
    invoke('getText', { example: 'my-invoke-variable' }).then(setToday);
    invoke('jsonplaceholder').then(setUsers);
    invoke('jsonplaceholderpost', {title: "Test Title", body: "Test Body"}).then(setPost);
  }, []);
  
  useEffect(() => {
    if (context) {
      const issueId = context?.extension.issue.id;
      fetchCommentsForIssue(issueId).then(setComments);
    }
  }, [context]);
  
  return (
    <>
      <Text>{comments ? `comments count: ${comments.length}` : 'Loading...'}</Text>
      <Text>{today ? today : 'Loading...'}</Text>
      <Text>{users ? users[0].name : 'Loading...'}</Text>
      <Text>{post ? post : 'Loading...'}</Text>
    </>
  );
};

ForgeReconciler.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
