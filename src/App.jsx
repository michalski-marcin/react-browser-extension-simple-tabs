import React, { useState, useEffect } from "react";
import "./App.css";
import { style } from "./assets/Styling";

function App() {
  const [mySites, setMySites] = useState([]);
  const [inputTitle, setInputTitle] = useState("");
  const [inputComment, setInputComment] = useState("");

  useEffect(() => {
    const storage = chrome?.storage?.local;
    // const storage = chrome?.storage?.local || browser?.storage?.local;

    if (!storage) {
      console.error("WebExtensions storage API not supported");
      return;
    }

    storage.get("mySites", (result) => {
      const sitesFromStorage = result.mySites;
      if (sitesFromStorage) {
        setMySites(sitesFromStorage);
      }
    });
  }, []);

  const saveTab = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const newSite = {
        title: inputTitle || tabs[0].title,
        comment: inputComment,
        url: tabs[0].url,
      };

      setMySites([...mySites, newSite]);

      const storage = chrome?.storage?.local || browser?.storage?.local;
      if (storage) {
        storage.set({ mySites: [...mySites, newSite] });
      }

      setInputTitle("");
      setInputComment("");
    });
  };

  const deleteSite = (index) => {
    const updatedSites = [...mySites];
    updatedSites.splice(index, 1);

    setMySites(updatedSites);

    const storage = chrome?.storage?.local || browser?.storage?.local;
    if (storage) {
      storage.set({ mySites: updatedSites });
    }
  };

  return (
    <div className={style.bg}>
      <div className={style.container}>
        <div className={style.logo}>Tabs</div>
      <input
      className={style.input}
        type='text'
        id='input-title'
        placeholder='custom title'
        maxLength='35'
        required
        value={inputTitle}
        onChange={(e) => setInputTitle(e.target.value)}
      />
      <textarea
      className={style.textarea}
        rows='2'
        id='input-comment'
        placeholder='additional comment'
        maxLength='125'
        value={inputComment}
        onChange={(e) => setInputComment(e.target.value)} />
      
        <button onClick={saveTab} id='save-btn' className={style.savebutton}>
          Save Tab
        </button>
      
      <ul>
        {mySites.map((site, index) => (
          <li key={index}>
            <div>
              <button onClick={() => deleteSite(index)}>Delete</button>
            </div>
            <a target='_blank' href={site.url}>
              {site.title}
            </a>
            <p>{site.comment}</p>
          </li>
        ))}
        <li>
          <div className={style.tabContainer}>
          <div className={style.tabtext}>
            <a target='_blank' href="#" className={style.tabTitle}>
              Tutuł strony
            </a>
            
            <p className={style.tabComment}>Opis strony mideidjei custom</p>
            </div>
            <div className={style.tabDelete}>
              <button onClick={() => deleteSite(index)}>Delete</button>
            </div>
            </div>
          </li>
          
          <li>
          <div className={style.tabContainer}>
          <div className={style.tabtext}>
            <a target='_blank' href="#" className={style.tabTitle}>
              Tutuł strony
            </a>
            
            <p className={style.tabComment}>Opis strony mideidjei custom</p>
            </div>
            <div className={style.tabDelete}>
              <button onClick={() => deleteSite(index)}>Delete</button>
            </div>
            </div>
          </li>
      </ul>
      </div>
    </div>
  );
}

export default App;
