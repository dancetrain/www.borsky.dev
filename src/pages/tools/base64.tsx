import React, { useCallback, useState } from "react";
import Layout from "../../components/Layout";

function toB64(v: string) {
  return window.btoa(v)
}

function fromB64(v: string) {
  return window.atob(v)
}

const Base64: React.FC = () => {
  const [input, setInput] = useState<string>()
  const [output, setOutput] = useState<string>()

  const updateOutput = useCallback((value: string) => {
    setOutput(toB64(value))
  }, [input])

  return <Layout>
    <h1>Base64 Decode/Encoder tool</h1>

    <div>
      <h2>Text Data</h2>
      <textarea onChange={v => {
        setInput(v.target.value);
        updateOutput(v.target.value);
      }} value={input} rows={10} cols={186}/>
      <br/>
      <span>Paste text here</span>
    </div>
    <div>
      <h2>Base64 Data</h2>
      <textarea value={output}
                onChange={v => {setInput(fromB64(v.target.value)); setOutput(v.target.value)}}
                rows={10} cols={186}
      /><br/>
      <span>Paste base64 string here</span>
    </div>
  </Layout>
};
export default Base64;
