import { useCallback, useState, useEffect, useRef } from "react";
import { RefreshCcw } from 'lucide-react';

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [specialCase, setSpecialCase] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

    if (numberAllowed) str += "0123456789";
    if (specialCase) str += "!@#$%^&*()";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length) + 1;
      pass += str.charAt(char);

      setPassword(pass);
    }
  }, [length, numberAllowed, specialCase, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 20);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [passwordGenerator, numberAllowed, specialCase, length]);
  return (
    <div className="bg-black min-h-screen flex flex-col">
      <div className="w-full max-w-lg mx-auto shadow-md rounded-lg px-4 py-4 mt-20  bg-gray-800 text-orange-500">
        <h1 className=" text-center my-3 font-bold uppercase text-2xl  text-cyan-100">Password generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4 relative">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-2 px-3 mt-3"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
           <button
            onClick={passwordGenerator}
            className="absolute right-16 top-[61%] transform -translate-y-1/2 bg-transparent text-white px-2 py-1"
          >
            <RefreshCcw size={20} className="text-black" />
          </button>
          <button
            onClick={copyPasswordToClipboard}
            className="outline-none bg-blue-700 text-white px-3 py-0.5 mt-3 shrink-0"
          >
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-8 pt-5">
          <div className="flex items-center gap-x-1 mb-8">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1 mb-8">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1 mb-8">
            <input
              type="checkbox"
              defaultChecked={specialCase}
              id="characterInput"
              onChange={() => {
                setSpecialCase((prev) => !prev);
              }}
            />
            <label htmlFor="characterInput">Characters</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
