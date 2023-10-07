import { useState } from "react";
import Modal from "./Modal";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SHOW_DELETE = 0;
const SHOW_EDIT = 1;
const SHOW_ADD = 2;

async function addLookup(url, item) {
    return axios.post("http://127.0.0.1:8000/cars/lookup/api/" + url + "/", item).then(response=>response.data);
}

async function updateLookup(url, id, item) {
    return axios.put("http://127.0.0.1:8000/cars/lookup/api/" + url + "/" + id + "/", item).then(response=>response.data);
}

async function deleteLookup(url, id) {
    return axios.delete("http://127.0.0.1:8000/cars/lookup/api/" + url + "/" + id + "/");
}

export function LookupCard(props) {
    const [showDelete, setShowDelete] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showAdd, setShowAdd] = useState(false);
    const [input, setInput] = useState();
    const [selectInput, setSelectInput] = useState();
    const navigate = useNavigate();

    var url = props.title.toLowerCase();
    var field = props.lookup.toLowerCase();
    const [seletedItem, setSeletedItem] = useState(0);

    function handlerChange(e) {
        var name = e.target.name;
        var value = e.target.value;
        if (name === "input") {
            setInput(value);
        } else if (name === "selectInput") {
            setSelectInput(value);
        }
    }

    function handleDelete() {
        deleteLookup(url, seletedItem);
        setShowDelete(false); 
        navigate(0);
    }

    function handleEdit() {
        let formData = new FormData();
        formData.append(field, input);
        if (props.with_select) {
            formData.append(props.title2.toLowerCase(), selectInput);
        }
        updateLookup(url, seletedItem, formData).then(data => {
            setShowEdit(false); 
        });
        navigate(0);
    }

    function handleAdd() {
        let formData = new FormData();
        formData.append(field, input);
        if (props.with_select) {
            formData.append(props.title2.toLowerCase(), selectInput);
        }
        addLookup(url, formData).then(data => {
            setShowAdd(false); 
        });
        navigate(0);
    }

    function showModel(i, item) {
        if (i === 0) {
            setSeletedItem(item[0]);
            setShowDelete(true);  
        } else if(i === 1) {
            setSeletedItem(item[0]);
            setShowEdit(true);
            setInput(item[1]); 
            if (props.with_select) setSelectInput(item[2]); 
        } else if(i === 2) {
            setInput(); 
            setSelectInput(); 
            setShowAdd(true);  
        }
    }
    return <><div class="list-card">
    <div class="list-card-header align-center">
        {/* <div class="row"> */}
            <img width="60px" style={{marginRight: "10px",}} alt="Lookup image" src="https://www.pngkit.com/png/full/425-4251736_2016-jeep-wrangler-2016-jeep-wrangler-side-view.png" />
            <h1>{props.title}</h1>
        {/* </div> */}
{/*         
        <div class="action-icons">
            <i class="bi bi-three-dots" onClick={() => {var a = document.getElementById('dropdown'); if (a.style.display === "none") {a.style.display = "block";} else {a.style.display = "none";}}}></i>
            <div class="dropdown" id="dropdown">
                <ul>
                    <li>Delete All</li>
                    <li>Delete All</li>
                </ul>
            </div>
        </div> */}
    </div>
    <div class="list-card-body">
        <ul>
            {props.items.map(item => (
                <li class="space-between" key={item[0]}>
                    <h3>{item[1]}</h3>
                    <div class="action-icons">
                        <i class="bi bi-trash" onClick={() => showModel(SHOW_DELETE, item)}></i>
                        <i class="bi bi-pencil-square" onClick={() => showModel(SHOW_EDIT, item)}></i>
                    </div>
                </li>
            ))}
        </ul>
    </div>
    <div class="list-card-footer">
        <button class="btn btn-primary" style={{width: "100%"}} onClick={() => showModel(SHOW_ADD)}><i class="bi bi-plus-lg"></i> Add New {props.lookup}</button>
    </div>
</div>{showDelete && <Modal title={"Delete " + props.lookup}
                            btn1="Cancel" 
                            btn2="Delete" 
                            btn1Clicked={() => {setShowDelete(false);}} 
                            btn2Clicked={handleDelete}
                            btn2ColorClass="btn-danger">Are you sure, you want to delete?</Modal>}

    {showEdit && <Modal title={"Edit this " + props.lookup} 
                            btn1="Cancel" 
                            btn2="Update" 

                            with_select={props.with_select}
                            selectLabel={props.title2}
                            selectList={props.itemsSelect}
                            selectInput={selectInput}

                            with_input="true"
                            handlerChange={handlerChange}
                            input={input}
                            label={props.lookup}
                            btn1Clicked={() => {setShowEdit(false);}} 
                            btn2Clicked={handleEdit}>Are you sure, you want to edit?</Modal>}
    
    {showAdd && <Modal title={"Add new " + props.lookup}
                            btn1="Cancel" 
                            btn2="Add" 

                            with_select={props.with_select}
                            selectLabel={props.title2}
                            selectList={props.itemsSelect}
                            selectInput={selectInput}

                            with_input="true"
                            input={input}
                            label={props.lookup}

                            handlerChange={handlerChange}
                            btn1Clicked={() => {setShowAdd(false);}} 
                            btn2Clicked={handleAdd}></Modal>}</>
}