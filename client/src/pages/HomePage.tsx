import {Mas} from '../assets/svgs'
import GoalCard from '../components/GoalCard'

function HomePage(){
    // HomePage.tsx - temporal, solo para visualizar
    const mockGoals = [
    {
        id: "g1",
        title: "Dominar TypeScript",
        description: "Aprender tipos y arquitectura",
        timeline: { startDate: "2026-06-01", endDate: "2026-07-01" },
        isCompleted: false
    },
    {
        id: "g2",
        title: "Construir una API",
        description: "Backend con arquitectura limpia",
        timeline: { startDate: "2026-06-15", endDate: "2026-08-15" },
        isCompleted: false
    }
    ]

    return (
        <div className="flex-1">
            <h1 className="text-[#D4E4FA] text-2xl font-bold mt-7 ml-5">Mis metas</h1>
            <button className="fixed bottom-6 right-6 w-20 h-20 rounded-full bg-[#57F1DB] text-4xl flex justify-center items-center font-bold"><Mas /></button>
            <div className='pr-5 pl-5 pt-5'>{mockGoals.map( goal =>(
                <GoalCard key={goal.id} goal={goal}/>
            )
            )}</div>
        </div>
    )
}

export default HomePage