import { Route, Routes } from "react-router-dom";
import Forfamily from "./for-family";
import ForNanny from "./for-nanny";
import NotFound from "../not-found";


export default function Dashboard() {

    return (
        <div className="m-0 p-0">
            <Routes path="">
                <Route path="for-family" element={<Forfamily />} />
                <Route path="for-nanny" element={<ForNanny />} />
                <Route path="*" element={<NotFound />} />
            </Routes>

        </div>
    );
}