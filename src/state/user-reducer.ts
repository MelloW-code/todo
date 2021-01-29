type StateType = {
    name:string
    age: number
    childrenCount: number
}


type ActionType = {
    type: string //"INCREMENT_AGE" or "INCREMENT_CHILDREN"
    [key: string]: any
}

// 1. Добавлять возраст
// 2. Добавлять детей

export const userReducer = (user: StateType, action: ActionType) => {
    switch(action.type){
        case "INCREMENT_AGE":
            //user.age = user.age + 1
            return {...user, age: user.age + 1}
        case "INCREMENT_CHILDREN":
            //user.childrenCount = user.childrenCount + 1
            return {...user, childrenCount: user.childrenCount +1}
        case "CHANGE_NAME":
            return {...user, name: action.name}
        default:
            throw new Error("piy")
    }
}
