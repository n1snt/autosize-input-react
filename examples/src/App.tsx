import React, { useState, ChangeEvent } from "react";
import AutoSizeInput from "@src/AutoSizeInput";

import "./example.less";

const App: React.FC = () => {
  const [values, setValues] = useState({
    value1: "",
    value2: "example",
    value3: 3,
    value4: "",
    value5: "",
  });

  const updateInputValue = (
    key: keyof typeof values,
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    setValues((prev) => ({
      ...prev,
      [key]: event.target.value,
    }));
  };

  return (
    <div>
      <h3>Simple example:</h3>
      <AutoSizeInput
        autoFocus
        value={values.value1}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          updateInputValue("value1", e)
        }
      />

      <h3>Styled example with default value:</h3>
      <AutoSizeInput
        value={values.value2}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          updateInputValue("value2", e)
        }
        style={{ background: "#eee", borderRadius: 5, padding: 5 }}
        inputStyle={{
          border: "1px solid #999",
          borderRadius: 3,
          padding: 3,
          fontSize: 14,
        }}
      />

      <h3>Typed example with default value:</h3>
      <AutoSizeInput
        value={values.value3}
        type="number"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          updateInputValue("value3", e)
        }
      />

      <h3>Input with placeholder:</h3>
      <AutoSizeInput
        placeholder="Placeholder"
        value={values.value4}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          updateInputValue("value4", e)
        }
        style={{ background: "#eee", borderRadius: 5, padding: 5 }}
        inputStyle={{
          border: "1px solid #999",
          borderRadius: 3,
          padding: 3,
          fontSize: 14,
        }}
      />

      <h3>Input with placeholder as minimum width:</h3>
      <AutoSizeInput
        placeholder="Placeholder"
        placeholderIsMinWidth
        value={values.value5}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          updateInputValue("value5", e)
        }
        style={{ background: "#eee", borderRadius: 5, padding: 5 }}
        inputStyle={{
          border: "1px solid #999",
          borderRadius: 3,
          padding: 3,
          fontSize: 14,
        }}
      />
    </div>
  );
};

export default App;
