import {userReducer} from "./user-reducer";


test ('user reducer should increment only age', () => {
    const startState = { age: 20, childrenCount: 2, name: 'Dimych'}
    const endState = userReducer(startState, { type: 'INCREMENT_AGE'})

    expect(endState.age).toBe(21)
    expect(endState.childrenCount).toBe(2)
})


test ('user reducer should increment children', () => {
    const startState = { age: 20, childrenCount: 2, name: 'Dimych'}
    const endState = userReducer(startState, { type: 'INCREMENT_CHILDREN'})

    expect(endState.age).toBe(20)
    expect(endState.childrenCount).toBe(3)
})

test ('user reducer should change name', () => {
    const startState = { age: 20, childrenCount: 2, name: 'Dimych'}
    const newName = 'Serega'
    const endState = userReducer(startState, { type: 'CHANGE_NAME', name: newName})

    expect(endState.age).toBe(20)
    expect(endState.childrenCount).toBe(2)
    expect(endState.name).toBe('Serega')
})