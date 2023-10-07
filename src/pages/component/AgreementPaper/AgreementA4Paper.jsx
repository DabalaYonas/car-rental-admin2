import "./AgreementStyle.css";

export function AgreementA4Paper(props) {
     function printMe() {
        var agreementPaper = document.getElementById("agreement");

        var mywindow = window.open('', 'PRINT', 'height=400,width=600');

        mywindow.document.write('<html><head><title>' + document.title  + '</title>');
        mywindow.document.write('<link rel="stylesheet" href="./AgreementStyle.css" type="text/css" />');
        mywindow.document.write('</head><body>');
        mywindow.document.write(agreementPaper.innerHTML);
        mywindow.document.write('</body></html>');

        mywindow.document.close(); // necessary for IE >= 10
        mywindow.focus(); // necessary for IE >= 10*/

        setTimeout(function(){mywindow.print();},1000);

        return true;
    }
    return <>
        <div className="A4" id="agreement">
        <h1 className="text-center pd-v-3">CAR RENTAL AGREEMENT</h1>
        <p className="mr-b-2">This Car Rental Agreement ("Agreement") is made and entered into as of September 21, 2010,
            between <span className="blank-space-m">{props.ownerName}</span>, with an address of <span className="blank-space-m">{props.ownerAddr}</span>("Owner"), 
            and<span className="blank-space-m">{props.renterName}</span>, with an address of <span className="blank-space-m">{props.renterAddr}</span> ("Renter"). 
            Owner and Renter may also be referred to as "Party" in the singular and "Parties" in the plural. This 
            Agreement is subject to the following terms and conditions:</p>
        
        <h3>Rental Vehicle</h3>
        <p className="mr-b-2">Owner hereby agrees to rent to Renter the following vehicle ("Vehicle"): 
            Make:<span className="blank-space-m">{props.carMake}</span> 
            Year: <span className="blank-space-m">{props.carYear}</span> 
            Color: <span className="blank-space-m">{props.carColor}</span> 
            Model: <span className="blank-space-m">{props.carModel}</span>
            Plate Number: <span className="blank-space-m">{props.carPlate}</span>
            VIN:<span className="blank-space-m">{props.carVIN}</span></p>
        <h3>Rental Period</h3>
        <p>Owner agrees to rent Vehicle to Renter for the following period:</p>
        <p>Start Date: <span className="blank-space-m">{props.startDate}</span> End Date: <span className="blank-space-m">{props.endDate}</span></p>
        <p className="pd-v-1">The Parties agrees that this Agreement terminates upon the End Date specified 
        above. Notwithstanding anything to the contrary in this Agreement or any Exhibits,
         either Party may terminate this Agreement prior to the End Date with at least one (1) day notice. If 
         this Agreement is terminated prior to the End Date, the Parties will work together to determine 
         whether a refund of Rental Fees is necessary.</p>
        
        <h3>Rental Fees</h3>
        <p>The Renter hereby agrees to pay the Owner for use of the Vehicle as follows:</p>
        <p className="pd-v-2">Fees: ETB<span className="blank-space-sm">{props.perDayFees}</span> per day. 
        Fuel: Renter is not required to pay for the use of fuel. Deposit: 
        ETB<span className="blank-space-sm">{props.deposit}</span> Owner shall retain this 
        deposit to be used, in the event of loss of or damage to the Vehicle 
        during the term of this Agreement, to defray fully or partially the 
        cost of necessary repairs or replacement. In the absence of damage or 
        loss, said deposit shall be credited toward payment of the rental fee 
        and any excess shall be returned to the Renter.</p>
        <img src={props.signatureSrc} height="80px" id="signImg" alt="signature"/>
    </div>
    
    <div className="d-print-none mt-4">
        <div className="float-end">
            <button onClick={printMe} className="btn btn-primary me-1"><i className="bi bi-printer"></i></button>
        </div>
    </div>
</>
}