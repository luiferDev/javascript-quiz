import { Container, Stack, Typography } from '@mui/material'
import './App.css'
import { JavaScriptLogo } from './JavascriptLogo'
import Start from './Start'
import { useQuestionsStore } from './store/question'
import { Game } from './Game'

function App() {

  const questions = useQuestionsStore(state => state.questions)

  return (
    <main>
      <Container maxWidth='sm'>

        <Stack direction='row' gap={2} alignItems='center' justifyContent='center'>
          <JavaScriptLogo />
          <Typography variant='h2' component='h1'>
              JavaScript Quizz
          </Typography>
        </Stack>

      </Container>

      {questions.length === 0 && <Start />}
      {questions.length > 0 && <Game />}

    </main>
  )
}

export default App
