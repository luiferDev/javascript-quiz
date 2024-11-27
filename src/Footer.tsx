import { Button } from "@mui/material"
import { useQuestionsData } from "./hooks/useQuestionData"
import { useQuestionsStore } from "./store/question"


export default function Footer() {

    const reset = useQuestionsStore(state => state.reset)

    const { correct, incorrect, unanswered } = useQuestionsData()

    return (
        <footer style={{ marginTop: '16px' }}>
            <strong>{`${correct} correctas - ${incorrect} incorrectas - 
            ${unanswered} sin responder`}</strong>
            <div style={{ marginTop: '16px' }}></div>
            <Button onClick={() => reset()} >Reiniciar</Button>
        </footer>
    )
}
