
function Modal(props) {
    return <>
        <div class="modal" id="modal">
            <div class="modal-content">
                <h2>{props.title}</h2>
                {props.children && <p>{props.children}</p>}
                {props.with_input && <div class="input-container">
                    <label class="label">{props.label}</label>
                    <input type="text" placeholder="Category" class="input" required/>
                </div>}
                <div class="row">
                    <div class="col-6"><button class="btn btn-secondary" onclick="document.getElementById('modal').style.display = 'none';">{props.btn1}</button></div>
                    <div class="col-6"><a class="btn btn-primary">{props.btn2}</a></div>
                </div>
            </div>
        </div>
    </>
}

export default Modal;