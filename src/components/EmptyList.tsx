import { ClipboardText } from 'phosphor-react'

import styles from './EmptyList.module.css'

export function EmptyList() {
    return (
        <div className={styles.emptyList}>
            <ClipboardText size={56}/>
            <strong>Você ainda não tem tarefas cadastradas</strong>
            <p>Crie tarefas e organize seus itens a fazer</p>
            
        </div>
    )
}