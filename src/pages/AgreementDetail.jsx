import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { AgreementA4Paper } from "./component/AgreementPaper/AgreementA4Paper";
import { useState } from "react";

function AgreementDetail() {
    const COMPANY_NAME = "Dabo Car Renter";
    const COMPANY_ADDRESS = "Addis Ababa";
    const navigate = useNavigate();
    const state = useLocation().state;
    const { infos, signatureURL } = state ? state : {};
    
    if (state === null) {
      return <Navigate replace to="/customers" />
    }

    return <><AgreementA4Paper 
                ownerName={COMPANY_NAME}
                ownerAddr={COMPANY_ADDRESS}
                renterName={infos.fullName}
                carYear={infos.model_year}
                carMake={infos.brand}
                carModel={infos.model}
                carColor={infos.color}
                carPlate={infos.plate_number}
                startDate={infos.pickupdate}
                endDate={infos.return_date}
                perDayFees={infos.pricePerDay}
                carVIN={infos.vin}
                deposit={infos.deposit}
                signatureSrc={signatureURL}
                /></>
}

export default AgreementDetail;