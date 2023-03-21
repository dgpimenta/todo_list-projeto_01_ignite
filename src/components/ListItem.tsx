import { Trash } from 'phosphor-react'
import { ChangeEvent, useState } from 'react'

import check from '../assets/check.svg'

import styles from './ListItem.module.css'

interface TaskData {
    id: string
    taskName: string
}

interface TaskProps {
    task: TaskData;
    onDeleteTask: (task: TaskData) => void;
    onCheckTask: (task: TaskData, checked: boolean) => void;
}

export function ListItem({ task, onDeleteTask, onCheckTask }: TaskProps) { 
    const [checkedTasks, setCheckedTasks] = useState(false)
    
    const handleDeleteTask = () => {        
        onDeleteTask(task)
    } 

    const handleCheckTask = (event: ChangeEvent<HTMLInputElement>) => {
        const inputChecked = event.target.checked

        if (inputChecked) {
            setCheckedTasks(true)
        } else {            
            setCheckedTasks(false)
        }

        onCheckTask(task, inputChecked)                
    }

    return (
        <div className={styles.listItem}>

            <label>
                <input 
                    onChange={handleCheckTask}           
                    className={styles.checkboxRound}
                    type="checkbox"                                              
                />           
                <img src={check} alt="" />
                <p>{task.taskName}</p>
                <button 
                    onClick={handleDeleteTask} 
                    title="Deletar tarefa">
                    <Trash size={16} />
                </button>
            </label>           
            
        </div>
    )
}