import React, { useReducer, useRef } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Edit from "./pages/Edit";
import New from "./pages/New";
import Diary from "./pages/Diary";

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      const newItem = {
        ...action.data,
      };
      newState = [newItem, ...state];
      break;
    }
    case "REMOVED": {
      newState = state.filter((it) => it.id === action.target.id);
      break;
    }
    case "EDIT": {
      newState = state.map((it) =>
        it.id === action.data.id ? { ...action.data } : it
      );
      break;
    }
    default:
      return state;
  }
  return newState;
};

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

const dummyDate = [
  {
    id: 1,
    emotion: 1,
    content: "1번 post",
    date: 1647939863242,
  },
  {
    id: 2,
    emotion: 2,
    content: "2번 post",
    date: 1647939863243,
  },
  {
    id: 3,
    emotion: 3,
    content: "3번 post",
    date: 1647939863244,
  },
  {
    id: 4,
    emotion: 4,
    content: "4번 post",
    date: 1647939863245,
  },
  {
    id: 5,
    emotion: 5,
    content: "5번 post",
    date: 1647939863246,
  },
  {
    id: 6,
    emotion: 6,
    content: "6번 post",
    date: 1747938082132,
  },
];

function App() {
  const [data, dispatch] = useReducer(reducer, dummyDate);
  const dataId = useRef(6);
  //CREATE
  const onCreate = (data, content, emotion) => {
    dispatch({
      type: "CREATE",
      data: {
        id: dataId.current,
        date: new Date(data).getTime(),
        content,
        emotion,
      },
    });
    dataId.current += 1;
  };
  //REMOVE
  const onRemove = (targetId) => {
    dispatch({ type: "REMOVE", targetId });
  };
  //Edit
  const onEdit = (targetId, data, content, emotion) => {
    dispatch({
      type: "EDIT",
      data: {
        id: targetId,
        date: new Date(data).getTime(),
        content,
        emotion,
      },
    });
  };

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider
        value={{
          onCreate,
          onEdit,
          onRemove,
        }}
      >
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/new" element={<New />} />
              <Route path="/edit/:id" element={<Edit />} />
              <Route path="/diary/:id" element={<Diary />} />
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
