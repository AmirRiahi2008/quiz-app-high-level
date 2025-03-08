import {useState , useEffect} from 'react'

export default function ThemeSwitcher() {
    const [isDark , setIsDark] = useState(true);
    useEffect(() => {
        document.documentElement.setAttribute("data-theme" , isDark ? "dark" : 'light')
    } , [isDark])
  return (
     <div className="light-dark-toggle">
            <div className="sun-container">
              <img src="" alt="picture of sun" />
            </div>
            <label className="light-dark-switch" htmlFor="checkbox">
              <input type="checkbox" id="checkbox"  onClick={() => setIsDark(!isDark)}/>
              <div className="slider round"></div>
            </label>
            <div className="moon-container">
              <img src="" alt="picture of moon" />
            </div>
          </div>
  )
}
