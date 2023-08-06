import { useState } from 'react'
import './App.css'
import ReactMarkdown from "react-markdown"

const defaultMarkdownText = `
# Heading 1

## Sub Heading 1

This is a paragraph with some **bolded text**.

### Sub Heading 2

Here's a [link to OpenAI](https://openai.com/).

#### Sub Heading 3

Inline code: \`print("Hello, World!")\`

##### Sub Heading 4

Code block:
    def factorial(n):
    if n == 0:
    return 1
    else:
    return n * factorial(n-1)

    List:
    - Item 1
    - Item 2
    - Item 3
    
    > Blockquote: The best way to predict the future is to invent it. - Alan Kay

There's also [links](https://www.freecodecamp.com), and
> Block Quotes!

![React Logo w/ Text](https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png)

- And of course there are lists.
  - Some are bulleted.
      - With different indentation levels.
        - That look like this.

That's it!

`
function App() {
  const [text, setText] = useState<string>(defaultMarkdownText)
  return (
    <>
      <div>
        <h1 id="title">Markdown Code Editor</h1>
        <textarea value={text} onChange={(e) => setText(e.target.value)}placeholder="Enter Markdown Text Here..." id="editor">
        
        </textarea>
        <div id="preview">
          <ReactMarkdown>{text}</ReactMarkdown>
        </div>
        <footer>Created by Bryson Sutton</footer>
      </div>
    </>
  )
}

export default App
