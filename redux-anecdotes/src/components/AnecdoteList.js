import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteForAnecdote, initializeAnecdotes } from '../reducers/anecdoteReducer'
import { createNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  
  const anecdotes = useSelector(state => state.filter ? 
    state.anecdotes.filter(a => a.content.includes(state.filter)): 
    state.anecdotes
  )

  const anecdote = [...anecdotes].sort((x1, x2) => x2.votes - x1.votes)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [dispatch]) 

  const vote = (id) => {
    const theAnecdote = anecdotes.find(a => a.id === id)
    dispatch(voteForAnecdote(theAnecdote))
    const message = `You voted for this Anecdote : ${theAnecdote.content} `
    dispatch(createNotification(message, 3))
    
  }

  return (
    <div>
      <h2>Saved Anecdotes :</h2>
      {anecdote.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList