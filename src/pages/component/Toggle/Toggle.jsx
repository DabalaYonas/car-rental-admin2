import "./Toggle.css";

function Toggle(props) {
    return <div className="toggle-container">
        <div className="content-center">
            <input type="checkbox" id="switch" className="toggle-switch" name={props.name} onChange={props.onChange} checked={props.checked} />
            <label for="switch" className="toggle">Toggle</label>
        </div>
    </div>
}

export default Toggle;