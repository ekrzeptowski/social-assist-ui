import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";

import policy from "./policy2.md";

function PrivacyPolicy() {
  const [text, setText] = useState("");

  useEffect(() => {
    fetch(policy)
      .then((res) => res.text())
      .then((res) => setText(res));
    console.log(policy);
  }, []);
  return (
    <div>
      <ReactMarkdown>{text}</ReactMarkdown>
    </div>
  );
}

export default PrivacyPolicy;
