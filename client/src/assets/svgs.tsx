export function Logo(){
    return(
        <svg width="30" height="30" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 20C8.61667 20 7.31667 19.7375 6.1 19.2125C4.88333 18.6875 3.825 17.975 2.925 17.075C2.025 16.175 1.3125 15.1167 0.7875 13.9C0.2625 12.6833 0 11.3833 0 10C0 8.61667 0.2625 7.31667 0.7875 6.1C1.3125 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.3125 6.1 0.7875C7.31667 0.2625 8.61667 0 10 0C11.3833 0 12.6833 0.2625 13.9 0.7875C15.1167 1.3125 16.175 2.025 17.075 2.925C17.975 3.825 18.6875 4.88333 19.2125 6.1C19.7375 7.31667 20 8.61667 20 10C20 11.3833 19.7375 12.6833 19.2125 13.9C18.6875 15.1167 17.975 16.175 17.075 17.075C16.175 17.975 15.1167 18.6875 13.9 19.2125C12.6833 19.7375 11.3833 20 10 20V20M10 18C12.2333 18 14.125 17.225 15.675 15.675C17.225 14.125 18 12.2333 18 10C18 7.76667 17.225 5.875 15.675 4.325C14.125 2.775 12.2333 2 10 2C7.76667 2 5.875 2.775 4.325 4.325C2.775 5.875 2 7.76667 2 10C2 12.2333 2.775 14.125 4.325 15.675C5.875 17.225 7.76667 18 10 18V18M10 16C8.33333 16 6.91667 15.4167 5.75 14.25C4.58333 13.0833 4 11.6667 4 10C4 8.33333 4.58333 6.91667 5.75 5.75C6.91667 4.58333 8.33333 4 10 4C11.6667 4 13.0833 4.58333 14.25 5.75C15.4167 6.91667 16 8.33333 16 10C16 11.6667 15.4167 13.0833 14.25 14.25C13.0833 15.4167 11.6667 16 10 16V16M10 14C11.1 14 12.0417 13.6083 12.825 12.825C13.6083 12.0417 14 11.1 14 10C14 8.9 13.6083 7.95833 12.825 7.175C12.0417 6.39167 11.1 6 10 6C8.9 6 7.95833 6.39167 7.175 7.175C6.39167 7.95833 6 8.9 6 10C6 11.1 6.39167 12.0417 7.175 12.825C7.95833 13.6083 8.9 14 10 14V14M10 12C9.45 12 8.97917 11.8042 8.5875 11.4125C8.19583 11.0208 8 10.55 8 10C8 9.45 8.19583 8.97917 8.5875 8.5875C8.97917 8.19583 9.45 8 10 8C10.55 8 11.0208 8.19583 11.4125 8.5875C11.8042 8.97917 12 9.45 12 10C12 10.55 11.8042 11.0208 11.4125 11.4125C11.0208 11.8042 10.55 12 10 12V12" fill="#57F1DB"/>
        </svg>
    )
}

export function Mas({height, width}: {height: number, width: number}){
    return(
        <svg width={width} height={height} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 8H0V6H6V0H8V6H14V8H8V14H6V8Z" fill="#003731"/>
        </svg>

    )
}

export function DesplegableUp(){
    return(
        <svg width="15" height="15" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 0L12 6L10.6 7.4L6 2.8L1.4 7.4L0 6L6 0Z" fill="#BACAC5"/>
        </svg>

    )
}

export function DesplegableDown(){
    return(
        <svg width="15" height="15" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 7.4L0 1.4L1.4 0L6 4.6L10.6 0L12 1.4L6 7.4Z" fill="#BACAC5"/>
        </svg>
    )
}

export function Pencil({height, width}:{height:number, width:number}){
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-pencil-icon lucide-pencil">
            <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/>
            <path d="m15 5 4 4"/>
        </svg>
    )
}

export function Cancel({height, width}:{height:number, width:number}){
    return (
        <svg width={width} height={height} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.4 14L0 12.6L5.6 7L0 1.4L1.4 0L7 5.6L12.6 0L14 1.4L8.4 7L14 12.6L12.6 14L7 8.4L1.4 14V14" fill="#BACAC5"/>
        </svg>

    )
}