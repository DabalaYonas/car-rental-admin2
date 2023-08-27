
function Card(props) {         
    return <div className="myCard" style={{width: "320px!important"}}>
    <div className="myCard-header">
        <h3>{props.title}</h3>
    </div>
    
    <div className="myCard-body">
        <div className="space-between align-center">
            <p className="myCard-text">{props.text}</p>
            <i className={"big-icon card-bg-" + props.cardBg + " " + props.iconClass}></i>
        </div>
    </div>
    
    {props.footerText &&
        <div className="myCard-footer">
            <div className="container-fluid">
                <p className="small-text">{props.footerText}</p>
            </div>
        </div>
    }
</div>
}

export default Card