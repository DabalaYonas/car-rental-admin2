
function InputView(props) {
    return <div className="input-container">
              <label className="label">{props.lable}</label>
              <input type={props.type} placeholder={props.placeholder} className="input" name={props.name} onChange={props.onChange} value={props.value} required/>
            </div>
}

export default InputView;