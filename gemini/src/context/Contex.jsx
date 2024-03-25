import { createContext, useState } from "react";
import runChat from "../config/gemini";
export const Context = createContext();
const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [previousPrompt, setPreviousPrompt] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const delayPara = (index, nextWord) => {
    setTimeout(function () {
      setResultData((prev) => prev + nextWord);
    }, 75 * index);
  };
  const newChat = ()=>{


    setLoading(false);
    setShowResult(false);

  }

  const onSent = async (prompt) => {
    // runChat
    setResultData("");
    setLoading(true);  
    setShowResult(true);
    let response;
    if (prompt != undefined) {
      response = await runChat(prompt);
      setRecentPrompt(prompt);
    } else {
      setPreviousPrompt((prev) => [...prev, input]);
      setRecentPrompt(input);
      response = await runChat(input);
    }

    let responseArray = response.split("**");

    let newRes = "";
    for (let i = 0; i < responseArray.length; i++) {
      if (i == 0 || i % 2 != 1) {
        newRes += responseArray[i];
      } else {
        newRes += "<b>" + responseArray[i] + "</b>";
      }
    }
    let newRes2 = newRes.split("*").join("</br>");
    // setResultData(newRes2);
    let newResponseArray = newRes2.split(" ");
    for (let i = 0; i < newResponseArray.length; i++) {
      const nextWord = newResponseArray[i];
      // delayPara(i,nextWord);
      delayPara(i, nextWord + " ");
    }
    setLoading(false);
    setInput("");
  };

  const contextValue = {
    previousPrompt,
    setPreviousPrompt,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat
  };
  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
