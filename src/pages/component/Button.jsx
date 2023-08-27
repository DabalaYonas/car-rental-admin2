
function Button(props) {
    return <button type="submit" className={"btn-secondary btn " + props.size} onClick={props.onClick}>{props.value} <i className={props.iconClass}></i></button>
  }

  export default Button