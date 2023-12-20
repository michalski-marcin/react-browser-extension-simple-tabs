import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./App.css";
import { style } from "./assets/Styling";
import { RxCross2 } from "react-icons/rx";

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
        <div className={style.logo}>
          <p className={style.logoText}>TabMinder</p>
        </div>
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
        <input
          className={style.input}
          id='input-comment'
          placeholder='additional comment'
          maxLength='150'
          value={inputComment}
          onChange={(e) => setInputComment(e.target.value)}
        />

        <button onClick={saveTab} id='save-btn' className={style.savebutton}>
          Add Tab
        </button>

        <ul>
          <AnimatePresence>
          {mySites.map((site, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}>
              <div className={style.tabContainer}>
                <div className={style.tabtext}>
                  <a target='_blank' href={site.url} className={style.tabTitle}>
                    {site.title}
                  </a>
                  <p className={style.tabComment}>{site.comment}</p>
                </div>
                <div className={style.tabDelete}>
                  <button onClick={() => deleteSite(index)}>
                    <RxCross2 />
                  </button>
                </div>
              </div>
            </motion.li>
          ))}
          {/* <li>
            <div className={style.tabContainer}>
              <div className={style.tabtext}>
                <a target='_blank' href='#' className={style.tabTitle}>
                  dev test title1
                </a>

                <p className={style.tabComment}>dev test 1 desrptn</p>
              </div>
              <div className={style.tabDelete}>
                <button onClick={() => deleteSite(index)}>
                  <RxCross2 />
                </button>
              </div>
            </div>
          </li>

          <li>
            <div className={style.tabContainer}>
              <div className={style.tabtext}>
                <a target='_blank' href='#' className={style.tabTitle}>
                  dev test title2
                </a>

                <p className={style.tabComment}>dev test 2 desrptn</p>
              </div>
              <div className={style.tabDelete}>
                <button onClick={() => deleteSite(index)}>
                  <RxCross2 />
                </button>
              </div>
            </div>
          </li> */}
          </AnimatePresence>
        </ul>
      </div>
    </div>
  );
}

export default App;
