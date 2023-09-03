import { useEffect, useState } from "react";

function ListView(props) {
    const [checks, setChecks] = useState([]);
    
    function handlerSelectAll(e) {
        var isChecked = e.target.checked;
        
        console.log(e.target.classList);
    }


    return <div>
            <div className="myCard-body">
                <div style={{overflow: "auto"}}>
                    <table>
                        <thead>{props.listHeader.length > 0 &&
                            <tr className="table-header">
                                <th><div className="checkbox-table">
                                    <input type="checkbox" className="checkbox" onClick={handlerSelectAll}/>
                                </div></th>
                                {props.listHeader.map((item, i) => (
                                    <th style={{textAlign: "center"}}  key={i}>{item}</th>
                                ))}
                            </tr>
                            }
                        </thead>  
                        
                        <tbody>
                        {props.listItems.length > 0 && props.listItems.map((item, index) => (
                            <tr key={index} index={index} onClick={() => props.handleClick(item[0])}>
                            <td><div className="checkbox-table">
                                <input type="checkbox" className="checkbox"/>
                            </div></td>
                            
                            {item.map((e, i) => (
                                <td style={{textAlign: "center"}} key={i}>
                                    {typeof(e) === 'boolean' ? (e ? <i className="bi bi-check-circle-fill text-success-color"></i> : <i className="bi bi-x-circle-fill text-error-color"></i>)  
                                    : (props.badge === i ? (<Badge key={i}>{e}</Badge>) : e)}
                                </td>
                                // 
                            ))}
                            </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
            </div>
    </div>
}

function Badge({children}) {
    var bgColor;
    const [PENDING, ACCEPTED, CANCELLED, COMPLETED, PAID, NOT_PAID] = ["PENDING", "ACCEPTED", "CANCELLED", "COMPLETED", "PAID", "NOT PAID"];
    switch (children) {
        case PENDING:
            bgColor = "bg-success";
            break;

        case ACCEPTED:
            bgColor = "bg-primary";
            break;

        case CANCELLED:
            bgColor = "bg-error";
            break;
            
        case COMPLETED:
            bgColor = "bg-primary";
            break;
            
        case PAID:
            bgColor = "bg-primary";
            break;
            
        case NOT_PAID:
            bgColor = "bg-error";
            break;
    
        default:
            bgColor = "transparence";
            break;
    }

    return <span style={{textAlign: "center"}} className={"badge " + bgColor}>{children}</span>
}

export default ListView;