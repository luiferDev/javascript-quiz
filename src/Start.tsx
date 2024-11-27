import { Button } from "@mui/material";
import { useQuestionsStore } from "./store/question";

const LIMIT_QUESTIONS = 10

export default function Start() {
    const fetchQuestions = useQuestionsStore(state => state.fetchQuestion)

    const hadleClick = () => {
        fetchQuestions(LIMIT_QUESTIONS)
    }
    return (
        <Button onClick={hadleClick} variant="contained" sx={{marginTop: '32px'}} >
            ¡Empezar!
        </Button>
    )
}
