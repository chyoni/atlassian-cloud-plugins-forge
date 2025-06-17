import React, { useEffect, useState } from 'react';
import { view } from '@forge/bridge';
import { Router, Route, Routes } from 'react-router';
import Boards from './pages/boards';

import NewArticle from './pages/new-board';

/* function Link({ to, children }) {
  const navigate = useNavigate();
  return (
    <a
      href={to}
      onClick={(event) => {
        event.preventDefault();
        navigate(to);
      }}
    >
      {children}
    </a>
  );
}

function Home() {
  return (
    <Fragment>
      <h2>Home</h2>
      <Link to="/sub-1">Sub 1</Link>
      <Link to="/sub-2">Sub 2</Link>
    </Fragment>
  );
} */

function App() {
  const [history, setHistory] = useState(null);

  useEffect(() => {
    // When the app mounts, we use the view API to create a history "log"
    view.createHistory().then((newHistory) => {
      setHistory(newHistory);
    });
  }, []);

  const [historyState, setHistoryState] = useState(null);

  useEffect(() => {
    if (!historyState && history) {
      // The initial values of action and location will be the app URL
      setHistoryState({
        action: history.action,
        location: history.location,
      });
    }
  }, [history, historyState]);

  useEffect(() => {
    if (history) {
      // Starts listening for location changes and calls the given callback when changed
      history.listen((location, action) => {
        setHistoryState({
          action,
          location,
        });
      });
    }
  }, [history]);

  return (
    <div>
      {history && historyState ? (
        <Router
          navigator={history}
          navigationType={historyState.action}
          location={historyState.location}
        >
          <Routes>
            <Route path="/boards" element={<Boards />}></Route>
            <Route path="/boards/new" element={<NewArticle />}></Route>
          </Routes>
        </Router>
      ) : (
        'Loading...'
      )}
    </div>
  );
}

export default App;
