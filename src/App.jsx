import { useCallback, useEffect, useRef, useState } from 'react'

function App() {
  const [pass, setPass] = useState("");
  const [length, setLength] = useState(8);
  const [numberAllow, setNumberAllow] = useState(false);
  const [charAllow, setCharAllow] = useState(false);
  const passwordRef = useRef(null);

  //generate random password each time this function is called
  const passGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let num = "1234567890";
    let chars = "!@#$%^&*_-.";
    for (let index = 1; index <= length; index++) {
      if (numberAllow) str += num; //if true includes numbers to password
      if (charAllow) str += chars; //if true includes characters to password
      let char = Math.floor(Math.random() * str.length);
      pass += str[char];
    }
    setPass(pass);
  },[length, numberAllow, charAllow])

  //calls passGenerator function each time anything changes in the dependency array
  useEffect(() => {
    passGenerator();
  }, [length, numberAllow, charAllow]);

  //copies password to clipboard 
  const passwordCopy = useCallback(() => {
    passwordRef.current?.select(); //selects(highlights) input value when this function is called
    window.navigator.clipboard.writeText(pass); //copy to clipboard
  })

  return (
    <div className='flex w-full h-full items-center justify-center bg-black'>
      <div className='absolute top-0 w-screen h-1/5 text-white font-bold bg-gray-800 flex items-center justify-center text-3xl'>
        PASSWORD GENERATOR
      </div>
      <div className='flex flex-col items-center justify-center gap-6  text-sm bg-gray-800 text-white h-1/3 w-1/3 p-3 rounded-3xl max-2xl:w-full'>
        <div className='flex w-full justify-between'>
          <input className='w-4/5 bg-gray-600 p-3 rounded-full' ref={passwordRef} type="text" value={pass} readOnly />
          <div onClick={passwordCopy} className='cursor-pointer bg-gray-600 hover:bg-gray-400 p-3 rounded-xl'>copy</div> {/* when no arguments need to be passed then onclick can have direct reference to the required function, else it wrapped in a arrow function to not fire the function at the start when event listner is mounted */}
        </div>
        <div className='flex w-full justify-between gap-8'>
          <div className='w-2/6 flex max-xl:flex-col'>
            <input onChange={(e) => { setLength(e.target.value) }} type="range" value={length} min={8} max={24} />
            <label>Length({length})</label>
          </div>
          <div className='flex gap-2'>
            <div>
              <input onChange={(e) => { setNumberAllow(e.target.checked) }} type="checkbox" checked={numberAllow} />
              <label>Include Numbers</label>
            </div>
            <div>
              <input onChange={(e) => { setCharAllow(e.target.checked) }} type="checkbox" checked={charAllow} />
              <label>Include Characters</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App;
