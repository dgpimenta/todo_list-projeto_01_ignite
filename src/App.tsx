import { Header } from "./components/Header";
import { PlusCircle } from "phosphor-react";
import { EmptyList } from "./components/EmptyList";
import { ListItem } from "./components/ListItem";
import { ChangeEvent, FormEvent, InvalidEvent, useState } from "react";

import {v4 as uuidv4} from 'uuid'

import './global.css'

import styles from './App.module.css'

interface Task { 
  id: string 
  taskName: string
}

export function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [concludedTasks, setConcludedTasks] = useState<Task[]>([])
  const [newTask, setNewTask] = useState('')  
  
  const handleCreateNewTask = (event: FormEvent) => {
    event.preventDefault()

    setTasks([...tasks, {id: uuidv4() , taskName: newTask}])
    setNewTask('')    
  }

  const handleNewTaskChange = (event: ChangeEvent<HTMLInputElement>) => {   
    event.target.setCustomValidity('') 
    setNewTask(event.target.value)
  }

  const handleNewTaskInvalid = (event: InvalidEvent<HTMLInputElement>) => {
    event.target.setCustomValidity('Preencher este campo!')
  }      

  const checkTask = (task: Task, inputChecked: boolean) => {
    if (inputChecked) {
      setConcludedTasks([...concludedTasks, task])
    } else {
      const filteredTasks = concludedTasks.filter((concludedTask) => {
        return concludedTask.id !== task.id
      })
      console.log(filteredTasks)
      setConcludedTasks(filteredTasks)
    }    
  }  

  const deleteTask = (taskToDelete: Task) => {
    const tasksWithoutDeletedOne = tasks
      .filter(task => {
      return task.id !== taskToDelete.id
    })
    console.log(tasksWithoutDeletedOne)

    const tasksCompletedWithoutDeletedOne = concludedTasks
      .filter(task => {
      return task.id !== taskToDelete.id 
    })
    console.log(tasksCompletedWithoutDeletedOne)

    setTasks(tasksWithoutDeletedOne)  
    setConcludedTasks(tasksCompletedWithoutDeletedOne)  
  }

  const tasksCreated = tasks.length
  const hasNoTask = tasksCreated === 0
  const isNewTaskEmpty = newTask.length === 0

  return (
    <div>
      <Header />

      <main>
        <form 
          onSubmit={handleCreateNewTask}          
          className={styles.taskForm}>           
            <input
              name="task" 
              placeholder="Adicione uma nova tarefa" type="text"
              value={newTask}
              onChange={handleNewTaskChange} 
              onInvalid={handleNewTaskInvalid}
              required
              autoComplete="off"
            />             
            <button 
              type='submit'              
              disabled={isNewTaskEmpty}>
                Criar
              <PlusCircle size={16} />
            </button>          
        </form>

        <div className={styles.contentsBox}>
          <header className={styles.boxHeader}>
            <div className={styles.createdTasks}>
              <h1>Tarefas criadas</h1>
              <strong>
                {tasksCreated}
              </strong>
            </div>
            <div className={styles.concludedTasks}>
              <h2>Concluídas</h2>
              <strong>
                {`${concludedTasks.length} de ${tasksCreated}`}
              </strong>
            </div>
          </header>
                
          {
            hasNoTask 
              ? <EmptyList /> 
              : tasks.map(task => {
              return <ListItem 
                key={task.id} 
                task={task}
                onDeleteTask={deleteTask}
                onCheckTask={checkTask}
                />
            })
          }   
          
        </div>      
        
      </main>
    </div>
  )
}


