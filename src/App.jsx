import { useCallback, useState } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [specialCase, setSpecialCase] = useState(false);
  const [password, setPassword] = useState("");

  const passwordGenerator = useCallback(() => {
    const pass = "";
    const str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

    if (numberAllowed) str += "0123456789";
    if (specialCase) str += "!@#$%^&*()";

    for (let i = 1; i <= array.length; i++) {
      let char = Math.floor(Math.random() * str.length) + 1;
      pass += str.charAt(char);

      setPassword(pass);
    }
  }, [length, numberAllowed, specialCase, charAllowed, setPassword]);

  return (
    <div className="bg-gray-500 h-screen">
      <h1 className="flex text-3xl font-bold  justify-center items-center pt-4">
        Pass word Generator
      </h1>
    </div>
  );
}

export default App;
