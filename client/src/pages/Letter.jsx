import React, { useState, useEffect } from "react";
import "../assets/css/letter.css";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEmailData } from "../components";
import config from "../config/config";

function Letter() {
  const { emailData } = useEmailData();
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { buttons, api } = config.letterPage;
  const [placeholder, setPlaceholder] = useState(
    config.letterPage.placeholder.default
  );

  useEffect(() => {
    updateDate();
  }, []);

  const updateDate = () => {
    const date = new Date();
    const dateNum = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`;
    const monthNum =
      date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
    const yearNum = date.getFullYear();
    document.documentElement.style.setProperty(
      "--date",
      `'${dateNum}/${monthNum}/${yearNum}'`
    );
  };

  const sendEmail = async () => {
    if (text.trim()) {
      setIsLoading(true);
      setPlaceholder(buttons.loading);

      try {
        const response = await fetch(`${api.baseURL}${api.sendEmailEndpoint}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: text,
            score: `Score: ${emailData.score} out of ${emailData.totalQuestions}`,
            drawings: emailData.drawings,
          }),
        });

        if (response.ok) {
          setText("");
          setPlaceholder(config.letterPage.placeholder.success);
          setTimeout(() => {
            navigate("/closing");
          }, 2000);
        } else {
          throw new Error("Failed to send email");
        }
      } catch (error) {
        console.error("Error sending email:", error);
        setPlaceholder(config.letterPage.placeholder.error);
        setTimeout(() => {
          setPlaceholder(config.letterPage.placeholder.default);
        }, 3000);
      } finally {
        setIsLoading(false);
      }
    } else {
      setPlaceholder(config.letterPage.placeholder.emptyInput);
      setTimeout(() => {
        setPlaceholder(config.letterPage.placeholder.default);
      }, 2000);
    }
  };

  const clearText = () => {
    setText("");
  };

  const autoResize = (event) => {
    event.target.style.height = "auto";
    event.target.style.height = `${event.target.scrollHeight}px`;
  };

  return (
    <motion.div
      className="letter-page"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.8 }}
    >
      <div className="content" id="content">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={placeholder}
          id="entry"
          wrap="soft"
          rows={4}
          onInput={autoResize}
          style={{ overflow: "hidden", resize: "none" }}
          disabled={isLoading}
        ></textarea>
        <button onClick={clearText} className="clear-btn" disabled={isLoading}>
          {buttons.clearText}
        </button>
      </div>

      <button className="fixed" onClick={sendEmail} disabled={isLoading}>
        {isLoading ? buttons.loading : buttons.sendMessage}
      </button>
    </motion.div>
  );
}

export default Letter;

//reference by Yahya Tarique on Codepen, thank you Yahya!
//https://codepen.io/YahyaTarique/pen/RwBLogK
