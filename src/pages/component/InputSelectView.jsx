
function InputSelectView(props) {
    return <div className="input-container">
    <label className="label">{props.lable}</label>
    <select className="input" name={props.name} onChange={props.onChange} value={props.value} required>
        {props.children}
    </select>
  </div>
}

export default InputSelectView;