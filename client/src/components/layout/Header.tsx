import {Logo} from "../../assets/svgs"
function Header(){
    return (
        <div className="flex flex-row justify-center bg-[#051424] p-6 items-center border-b-2 border-[#3C4A46] fixed w-full">
            <div className="flex flex-row gap-3 items-center">
                <Logo/>
                <h2 className="text-lg font-bold text-[#57F1DB]">Goal Tracker</h2>
            </div>
        </div>
    )
}

export default Header