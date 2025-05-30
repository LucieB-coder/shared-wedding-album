import momAndDad from "../../../assets/images/cute.jpg"
import {Outlet} from "react-router-dom";

const Layout = () => {
    return (
        <div className="flex flex-row flex-1 items-center justify-between min-h-screen bg-cover bg-center"
             style={{backgroundImage: `url(${momAndDad})`}}>
            <div className="bg-black/50 min-h-screen min-w-screen">
                <div className="flex flex-col gap-6 flex-1 items-center justify-center py-8 px-4">
                    <p className="text-white font-parisienne text-5xl text-center backdrop-blur-[2px]">Frank & Corinne</p>
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}

export default Layout;