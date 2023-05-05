import React from "react";
import { useState } from "react"

function TextTOSpeech(toggle) {
    const speech = new SpeechSynthesisUtterance();
    function speak() {
        if (toggle == false){
            toggle = true;
           
            const textElements = document.querySelectorAll("p, h1, h2, h3, h4, h5, h6, span, li, td, th, label, button, a, input[type='button'], input[type='submit'], input[type='reset'], [aria-label]");
            const text = Array.from(textElements).map(el => el.innerText).join(". ");
            speech.text = text;
            speech.lang = "en-US";
        }
        if(toggle == true){
            window.speechSynthesis.speak(speech);
        }
        else{
            window.speechSynthesis.cancel(speech);
            toggle = false;
        }
        
      }


  return (
        <button className = 'btn-dark' onClick={speak}>Text-To-Speech!</button>
  )
}

export default TextTOSpeech