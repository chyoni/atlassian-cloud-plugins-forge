import React, { useEffect, useState } from "react";
import { view } from "@forge/bridge";
import ForgeReconciler, { Text } from "@forge/react";
import { Router, Route, Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";

function Home() {
  return (
    <>
      <Text>Home</Text>
    </>
  );
}

function Sub1Page() {
  return (
    <>
      <Text>Sub1</Text>
    </>
  );
}

function Sub2Page() {
  return (
    <>
      <Text>Sub2</Text>
    </>
  );
}

function AdminApp() {
  const [history, setHistory] = useState(null);

  useEffect(() => {
    view.createHistory().then((newHistory) => {
      setHistory(newHistory);
    });
  }, []);

  const [historyState, setHistoryState] = useState(null);

  useEffect(() => {
    if (!historyState && history) {
      setHistoryState({
        action: history.action,
        location: history.location,
      });
    }
  }, [history, historyState]);

  useEffect(() => {
    if (history) {
      history.listen((location, action) => {
        setHistoryState({
          action,
          location,
        });
      });
    }
  }, [history]);

  console.log(history, historyState);
  return (
    <>
      {history && historyState ? (
        <Router history={history}>
          <Switch>
            <Route path="/sub-admin-page-1" element={<Sub1Page />} />
            <Route path="/sub-admin-page-2" element={<Sub2Page />} />
            <Route path="*" element={<Home />} />
          </Switch>
        </Router>
      ) : (
        "Loading..."
      )}
    </>
  );
}

ForgeReconciler.render(
  <React.StrictMode>
    <AdminApp />
  </React.StrictMode>
);
