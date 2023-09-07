
export function LookupCard(props) {
    return <><div class="list-card">
    <div class="list-card-header space-between align-center">
        <div class="row">
            <img width="75px" style={{marginRight: "10px",}}  src="https://www.pngkit.com/png/full/425-4251736_2016-jeep-wrangler-2016-jeep-wrangler-side-view.png" />
            <h1>Categories</h1>
        </div>
        <div class="action-icons">
            <i class="bi bi-three-dots" onclick="document.getElementById('dropdown').style.display = 'block';"></i>
            <div class="dropdown" id="dropdown">
                <ul>
                    <li>Delete All</li>
                    <li>Delete All</li>
                </ul>
            </div>
        </div>
    </div>
    <div class="list-card-body">
        <ul>
            <li class="space-between"><h3>Small</h3><div class="action-icons"><i class="bi bi-trash" onclick="document.getElementById('modal').style.display = 'block';"></i><i class="bi bi-pencil-square"  onclick="document.getElementById('modal2').style.display = 'block';"></i></div></li>
            <li class="space-between"><h3>MidSize</h3><div class="action-icons"><i class="bi bi-trash"></i><i class="bi bi-pencil-square"></i></div></li>
            <li class="space-between"><h3>SUV</h3><div class="action-icons"><i class="bi bi-trash"></i><i class="bi bi-pencil-square"></i></div></li>
            <li class="space-between"><h3>Van</h3><div class="action-icons"><i class="bi bi-trash"></i><i class="bi bi-pencil-square"></i></div></li>
        </ul>
    </div>
    <div class="list-card-footer">
        <button class="btn btn-primary" style={{width: "100%"}}>+ Add New Category</button>
    </div>
</div></>
}