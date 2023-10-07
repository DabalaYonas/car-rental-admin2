
function Modal(props) {
    return <>
        <div className="modal" id="modal">
            <div className="modal-content">
                <h2>{props.title}</h2>
                {props.children && <p>{props.children}</p>}
                {props.with_select && <div className="input-container mr-b-2">
                    <label className="label" htmlFor="modelSelect">{props.selectLabel}</label>
                    <select className="form-control form-control-alternative" id="modelSelect" name="selectInput" onChange={props.handlerChange} value={props.selectInput}required>
                        <option value="">Select a {props.selectLabel}</option>
                        {props.selectList.map((e, i) => (<option key={i} value={e[0]}>{e[1]}</option>))}
                    </select>
                </div>}
                {props.with_input && <div className="input-container ">
                    <label className="label" htmlFor="modelInput">{props.label}</label>
                    <input type="text" placeholder={props.label} id="modelInput" className="input" name="input" onChange={props.handlerChange} value={props.input} required/>
                </div>}
                <div className="row">
                    <div className="col-6"><button className="btn btn-secondary" onClick={props.btn1Clicked}>{props.btn1}</button></div>
                    <div className="col-6"><button className={"btn btn-primary " + props.btn2ColorClass}  onClick={props.btn2Clicked}>{props.btn2}</button></div>
                </div>
            </div>
        </div>
    </>
}

export default Modal;