import React, { useState } from 'react'
import '../public/globals.css'
import { FlexCol } from './utils.jsx'
import { Button, Badge, Input } from 'shadcdn'

export var App = () => {
  const [todos, setTodos] = useState([])
  const [inputText, setInputText] = useState('')

  const addTodo = () => {
    if (!inputText.trim()) return
    setTodos([...todos, { id: Date.now(), text: inputText, done: false }])
    setInputText('')
  }

  const toggleTodo = id => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, done: !todo.done } : todo))
  }

  const deleteTodo = id => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const remainingCount = todos.filter(todo => !todo.done).length

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      background: 'linear-gradient(135deg,#d7d7d7 0%,#f4f4f4 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      fontFamily: 'Chicago, "Geneva", "Arial", sans-serif',
      boxSizing: 'border-box',
      padding: 0,
    }}>
      {/* Static Mac-style Menu Bar */}
      <div style={{
        width: '100vw',
        height: 24,
        background: '#e0e0e0',
        borderBottom: '2px solid #bfbfbf',
        boxShadow: '0 2px 4px #bbb',
        display: 'flex',
        alignItems: 'center',
        fontFamily: 'inherit',
        fontSize: 14,
        color: '#222',
        paddingLeft: 8,
      }}>
        🖥️ Utopia Mac
      </div>
      <div style={{
        marginTop: 48,
        background: '#f8f8f8',
        border: '2px solid #bfbfbf',
        borderRadius: 12,
        boxShadow: '4px 8px 24px #bbb',
        minWidth: 360,
        maxWidth: 420,
        padding: 32,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <h2 style={{ fontFamily: 'inherit', fontWeight: 700, marginBottom: 8, color: '#222', fontSize: 28 }}>
          Todo List <Badge style={{ marginLeft: 8, background: '#bfbfbf', color: '#222' }}>{todos.length}</Badge>
        </h2>
        <div style={{ display: 'flex', gap: 8, width: '100%', marginBottom: 16 }}>
          <Input
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            placeholder="New todo"
            style={{ flex: 1, fontSize: 16, background: '#fff', border: '2px inset #bfbfbf', borderRadius: 4, boxShadow: '1px 1px 0 #fff inset' }}
            onKeyDown={e => { if (e.key === 'Enter') addTodo() }}
          />
          <Button onClick={addTodo} style={{ fontWeight: 700, borderRadius: 6, background: '#e0e0e0', color: '#222', border: '1.5px outset #bfbfbf' }}>Add</Button>
        </div>
        <ul style={{ listStyle: 'none', padding: 0, width: '100%' }}>
          {todos.map(todo => (
            <li key={todo.id} style={{ display: 'flex', alignItems: 'center', marginBottom: 8, background: todo.done ? '#e0e0e0' : '#fff', borderRadius: 6, border: '1.5px solid #bfbfbf', boxShadow: todo.done ? 'none' : '1px 2px 8px #eee', padding: 4 }}>
              <Button variant="ghost" onClick={() => toggleTodo(todo.id)} style={{ fontFamily: 'inherit', fontWeight: 600, color: todo.done ? '#999' : '#222', textDecoration: todo.done ? 'line-through' : 'none', flex: 1, justifyContent: 'flex-start', background: 'none' }}>
                {todo.done ? '✅' : '⬜'} {todo.text}
              </Button>
              <Button variant="destructive" style={{ marginLeft: 8, borderRadius: 6, background: '#ffb0b0', color: '#222', border: '1.5px outset #bfbfbf' }} onClick={() => deleteTodo(todo.id)}>
                Delete
              </Button>
            </li>
          ))}
        </ul>
        <div style={{ marginTop: 16, color: '#333', fontWeight: 500, fontSize: 16 }}>{remainingCount} items remaining</div>
      </div>
    </div>
  )
}
