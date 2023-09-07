import { LookupCard } from "./component/LookupCard";
import Modal from "./component/Modal";

function SettingPage() {
    return <div>
    <h2 className="pd-v-2 pd-h-1">Settings</h2>
    <div className="row">
            <div class="col-3">
                <LookupCard></LookupCard>
            </div>
    </div>
    </div>
}

export default SettingPage;