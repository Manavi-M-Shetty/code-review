import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import "prismjs/themes/prism-tomorrow.css"
import prism from "prismjs"
import Editor from "react-simple-code-editor"
import axios from "axios"
import Markdown from 'react-markdown'

import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [code, setCode] = useState(`function sum(){
  return 1+1;
}`)
const[review,setReview]=useState(``)
  useEffect(() => {
    prism.highlightAll();
  }, [])
  async function  reviewCode(){
   const response= await axios.post('http://localhost:3000/ai/get-Review',{code})
    setReview(response.data)
  }


  return (
    <>
      <main>
        <div className='left'>
          <div className='code'></div>
          <Editor
            value={code}
            onValueChange={code => setCode(code)}
            highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
            padding={10}
            style={{
              fontFamily: '"Fira code", "Fira Mono", nonospace',
              fontSize: 18,
              border: "1px solid #ddd",
              borderRadius: "5px",
              height: "100%",
              width: "100%"
            }}

          />
          <div onClick={reviewCode}
          className='review'>Review</div>
        </div>
        <div 
        
        className='right'>
          <Markdown>
            {review}
          </Markdown>
        </div>
      </main>
    </>
  )
}
function sum() {
  return 1 + 1;
}

export default App
