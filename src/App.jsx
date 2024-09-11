import { useCallback, useState, useEffect, useRef } from "react";
import { RefreshCcw } from "lucide-react";
import Footer from "./components/Footer";

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
  }, [length, numberAllowed, specialCase]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 20);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [passwordGenerator, numberAllowed, specialCase, length]);

  return (
    <div className="bg-[url('/pass.jpg')] bg-cover min-h-screen flex flex-col">
      <div className="w-full max-w-lg sm:max-w-md md:max-w-lg mx-auto shadow-md rounded-lg px-4 py-6 mt-20 bg-cyan-800 text-green-400">
        <h1 className="text-center my-3 font-bold uppercase text-xl sm:text-lg md:text-2xl text-yellow-500">
          Password generator
        </h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4 relative">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-2 px-3 font-bold text-sm md:text-base lg:text-lg"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={passwordGenerator}
            className="absolute right-16 top-1/2 transform -translate-y-1/2 bg-transparent text-white px-2 py-1"
          >
            <RefreshCcw size={20} className="text-black" />
          </button>
          <button
            onClick={copyPasswordToClipboard}
            className="outline-none bg-blue-700 font-bold text-white px-3 py-0.5 shrink-0 text-sm md:text-base"
          >
            Copy
          </button>
        </div>

        <div className="flex flex-col sm:flex-row sm:gap-x-8 pt-5">
          <div className="flex flex-col sm:flex-row items-center gap-x-1 mb-4">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer w-full sm:w-auto"
              onChange={(e) => setLength(e.target.value)}
            />
            <label className="font-bold text-sm md:text-base mt-2 sm:mt-0">
              Length: {length}
            </label>
          </div>

          <div className="flex items-center gap-x-1 mb-4">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => setNumberAllowed((prev) => !prev)}
            />
            <label
              htmlFor="numberInput"
              className="font-bold text-sm md:text-base"
            >
              Numbers
            </label>
          </div>

          <div className="flex items-center gap-x-1 mb-4">
            <input
              type="checkbox"
              defaultChecked={specialCase}
              id="characterInput"
              onChange={() => setSpecialCase((prev) => !prev)}
            />
            <label
              htmlFor="characterInput"
              className="font-bold text-sm md:text-base"
            >
              Characters
            </label>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default App;
