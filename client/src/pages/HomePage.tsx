import {Mas} from '../assets/svgs'
import { useState } from 'react'
import GoalCard from '../components/GoalCard'
import GoalModal from '../components/GoalModal'
import {motion} from 'framer-motion'
import { useCreateGoal, useGoals, useUpdateGoal} from '../hooks/useGoals'
import GoalDetails from '../components/GoalDetails'


function HomePage(){
    // HomePage.tsx - temporal, solo para visualizar
    const createGoalMutation = useCreateGoal()
    const updateGoalMutation = useUpdateGoal()
    const {data: goals, isLoading, isError} = useGoals()
    
    const [selectedGoal, setSelectedGoal] = useState<string | null>(null)
    const [isFormOpen, setIsFormOpen] = useState(false)
    const handleForm = () =>{
        setIsFormOpen(true)
    }


    return isLoading ? <p>Cargando...</p> : isError ? <p>Error..</p> :(
        <div className="flex-1 pt-20 flex flex-col h-screen">
            <h1 className="text-[#D4E4FA] text-2xl font-bold mt-7 ml-5 mb-5">Mis metas</h1>
            <div className='flex-1 overflow-y-auto pr-5 pl-5 pt-5'>{goals?.map( goal =>(
                <GoalCard key={goal.id} goal={goal} onViewDetails ={()=> setSelectedGoal(goal.id)}/>
            )
            )}
            </div>
            {isFormOpen && <GoalModal
            onClose={() => setIsFormOpen(false)}
            onGoalCreated={(goal) => createGoalMutation.mutate(goal)}
            />}
            <motion.button whileHover={{scale: 1.1}} whileTap={{scale: 0.9}} onClick={handleForm}className="fixed bottom-6 right-6 w-20 h-20 rounded-full bg-[#57F1DB] text-4xl flex justify-center items-center font-bold"><Mas width= {20} height={20} /></motion.button>
            {selectedGoal !== null && <GoalDetails
            onClose={()=> setSelectedGoal(null)}
            goal={goals?.find(g => g.id === selectedGoal)}
            onGoalCreated = {(goal)=> updateGoalMutation.mutate(goal)}
            />}
        </div>
    )
}

export default HomePage