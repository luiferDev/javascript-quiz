import { Card, IconButton, List, ListItem, ListItemButton, ListItemText, Stack, Typography } from "@mui/material"
import SyntaxHighLighter from "react-syntax-highlighter"
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs"
import { useQuestionsStore } from "./store/question"
import { type Question as QuestionType } from "./types"
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material"
import Footer from "./Footer"

const getBackgorundColor = (info: QuestionType, index: number) => {

    const { userSelectedAnswer, correctAnswer } = info

    if (userSelectedAnswer == null) return 'transparent'
    if (index !== correctAnswer && index !== userSelectedAnswer) return 'transparent'
    if (index === correctAnswer) return 'green'
    if (index === userSelectedAnswer) return 'red'

    return 'transparent'
}

const Question = ({ info }: { info: QuestionType }) => {

    const selectAnswer = useQuestionsStore(state => state.selectAnswer)

    const createHandleClick = (answerIndex: number) => () => {
        selectAnswer(info.id, answerIndex)
    }

    return (
        <Card variant='outlined' sx={{
            bgcolor: '#222', p: 2, textAlign: 'left',
            marginTop: 4
        }}>
            <Typography variant='h5'>
                {info.question}
            </Typography>
            <SyntaxHighLighter language='javascript' style={atomOneDark} >
                {info.code}
            </SyntaxHighLighter>
            <List sx={{ bgcolor: '#333' }} disablePadding >
                {info.answers.map((answer, index) => (
                    <ListItem key={index} disablePadding divider >
                        <ListItemButton
                            disabled={info.userSelectedAnswer != null}
                            onClick={createHandleClick(index)}
                            sx={{ backgroundColor: getBackgorundColor(info, index) }} >
                            <ListItemText primary={answer} sx={{ textAlign: 'center' }} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Card>
    )
}

export const Game = () => {

    const questions = useQuestionsStore(state => state.questions)
    const currentQuestion = useQuestionsStore(state => state.currentQuestion)
    const goNextQuestion = useQuestionsStore(state => state.goNextQuestion)
    const goPreviusQuestion = useQuestionsStore(state => state.goPreviousQuestion)

    const questionInfo = questions[currentQuestion]

    return (
        <>
            <Stack direction='row' gap={2} alignItems='center' justifyContent='center'>
                <IconButton onClick={goPreviusQuestion} disabled={currentQuestion === 0} >
                    <ArrowBackIosNew />
                </IconButton>
                {currentQuestion + 1} / {questions.length}
                <IconButton onClick={goNextQuestion} disabled={currentQuestion >= questions.length - 1} > 
                    <ArrowForwardIos />
                </IconButton>
            </Stack>
            <Question info={questionInfo} />
            <Footer />
        </>
    )
}