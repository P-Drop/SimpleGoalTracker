import Header from "./Header"
import { Outlet } from "react-router-dom"

function MainLayout(){
    return (
        <div className="flex flex-col bg-[#051424] min-h-screen ">
            <Header />
            <div className="flex-1">
                <Outlet />
            </div>
        </div>
    )
}

export default MainLayout