import momAndDad from "../assets/images/cute.jpg"
import {Outlet} from "react-router-dom";

const Layout = () => {
    return (
        <div className="h-screen bg-cover overflow-hidden bg-center"
             style={{backgroundImage: `url(${momAndDad})`}}>

            <div className="flex flex-row flex-1 items-center justify-between min-h-screen bg-cover bg-center"
            >
                <div className="bg-black/50 h-screen min-w-screen overflow-y-auto">
                    <div
                        className="flex flex-col gap-4 flex-1 items-center justify-center py-8 px-2 pb-[800px]">
                        <p className="text-white font-parisienne text-5xl text-center backdrop-blur-[2px]">Frank &
                            Corinne</p>
                        <Outlet/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Layout;