import { useState } from "react";
import { useEffect } from "react";
import "./Dropdown.css";

export function DropDown() {
    let arr = [];
  useEffect(() => {
    let list = document.getElementById("list");
        var input = document.getElementById("input");
    arr = list.children;

    input.addEventListener("keyup", () => {
    for (let i = 1; i < arr.length; i++){
        if (arr[i].innerText.includes(input.value)){
            arr[i].style.display = "block";
        } else {
        arr[i].style.display = "none";
        }
    }
    })

}, []);

const putin = (e) => {
    var input = document.getElementById("input");
    input.value = arr[e].innerText;
  }

    return <>
    <div id="select">
    <input className="form-control form-control-alternative" id="input" type="text" placeholder="Select Item" />
    <div id="list">
        <a>Select Item</a>
        <a onClick={() => putin(1)}>One Item</a>
        <a onClick={() => putin(2)}>two Item</a>
        <a onClick={() => putin(3)}>three Item</a>
        {/* <a href="javascript: putin(3)">third Item</a> */}
    </div>
    </div>
  </>
}