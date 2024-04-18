import axios from "axios";
import languages from "../assets/languages.json"
import { useEffect, useState } from "react"
const TextConversion = () => {
  const [inputText, setInputText] = useState("");
  const [translated, setTranslated] = useState("");
  const [inputLanguage, setInputLanguage] = useState("en");
  const [translateLanguage, setTranslateLanguage] = useState("ja");
  
async function translateText(text: string, fromLang: string, toLang: string) {
    const endpoint = "https://api.cognitive.microsofttranslator.com";
    const url = "/translate";
    const method = "post";
    const headers = {
      "Ocp-Apim-Subscription-Key":import.meta.env.VITE_TEXT_KEY,
      "Ocp-Apim-Subscription-Region":import.meta.env.VITE_REGION,
      "Content-type":"application/json" 
    }
    const data = [{
      text
    }]
    const params =  {
      'api-version': '3.0',
      'from':fromLang,
      'to': toLang,
    }
    try {
      const response = await axios({
        baseURL: endpoint,
        url,
        method,
        headers,
        params,
        data
      })
      const azureTranslatedText = response.data[0].translations[0].text;
      setTranslated(azureTranslatedText)
    } catch(error){
      console.log(error);
    }
  }  
  // Usage
  useEffect(() => {
    translateText(inputText, inputLanguage, translateLanguage);
  }, [inputText, inputLanguage, translateLanguage])
  const handleInputLanguage = (e:React.ChangeEvent<HTMLSelectElement>) => {
    setInputLanguage(e.target.value)
  }
  const handleTranslateLanguage = (e:React.ChangeEvent<HTMLSelectElement>) => {
    setTranslateLanguage(e.target.value)
  }
  return (

    <div className="flex flex-col gap-10 px-4">
      <div className=" input-text flex flex-col justify-center gap-2 ">
        <label className="text-[#A3FFD6] text-2xl my-2" htmlFor="input-text">Add Text</label>
        <div className="flex items-center">
          <input onChange={(e) => {
            setInputText(e.target.value)
          }} value={inputText} className="w-4/5 px-4 bg-[#000092] text-xl  text-[#A3FFD6] mr-4" type="text" id="input-text" placeholder="Add text to translate" />
          <select title="inputLanguage" onChange={(e)=>handleInputLanguage(e)} className="bg-[#000092] h-8 text-[#a3ffd6] border-none w-24" id="input-language-select">
            {Object.entries(languages).map(([language, code]) => (
              <option value={code}>{language}</option>
            ))}
          </select>
        </div>

      </div>

      <div className="translated-text ">
        <h2 className=" text-2xl text-[#A3FFD6] my-2">Translated Text</h2>
        <div className="flex gap-4">
          <p className="text-[#a3ffd6] p-2 w-4/5 overflow-x-hidden overflow-y-auto bg-[#000092] min-h-6 max-h-40">{translated}</p>
          <select title="translated-language" defaultValue={"ja"} onChange={(e)=>{handleTranslateLanguage(e)}} className="bg-[#000092] text-[#a3ffd6] border-none h-8 w-24" id="language-select">
            {Object.entries(languages).map(([language, code]) => (
              <option value={code}>{language}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}

export default TextConversion
