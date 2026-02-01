import { createContext, useContext, useState } from "react";

const EmailDataContext = createContext(null);

const EmailData = ({ children }) => {
  const [emailData, setEmailData] = useState({
    score: 0,
    totalQuestions: 0,
    drawings: [],
  });

  return (
    <EmailDataContext.Provider value={{ emailData, setEmailData }}>
      {children}
    </EmailDataContext.Provider>
  );
};

const useEmailData = () => useContext(EmailDataContext);

export { EmailData, useEmailData };
