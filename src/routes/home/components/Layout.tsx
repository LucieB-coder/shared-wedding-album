import momAndDad from "../../../assets/images/cute.jpg"
import type {ReactNode} from "react";

const Layout = ({children}: { children: ReactNode }) => {
    return (
        <div className="flex flex-row flex-1 items-center justify-between min-h-screen bg-cover bg-center"
             style={{backgroundImage: `url(${momAndDad})`}}>
            <div className="bg-black/50 min-h-screen min-w-screen">
                {children}
            </div>
        </div>
    )
}

export default Layout;