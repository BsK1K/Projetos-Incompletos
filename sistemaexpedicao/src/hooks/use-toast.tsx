import * as React from "react"

export type Toast = {
  id: string
  title?: string
  description?: string
  variant?: "default" | "destructive" | "success"
}

const TOAST_LIMIT = 5
const TOAST_REMOVE_DELAY = 5000

type ToasterToast = Toast & {
  id: string
  title?: string
  description?: string
  variant?: "default" | "destructive" | "success"
}

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

type ActionType = typeof actionTypes

type Action =
  | { type: ActionType["ADD_TOAST"]; toast: ToasterToast }
  | { type: ActionType["UPDATE_TOAST"]; toast: Partial<ToasterToast> }
  | { type: ActionType["DISMISS_TOAST"]; toastId?: string }
  | { type: ActionType["REMOVE_TOAST"]; toastId?: string }

interface State {
  toasts: ToasterToast[]
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case actionTypes.ADD_TOAST:
      return { ...state, toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT) }
    case actionTypes.UPDATE_TOAST:
      return { ...state, toasts: state.toasts.map((t) => (t.id === action.toast.id ? { ...t, ...action.toast } : t)) }
    case actionTypes.DISMISS_TOAST: {
      const id = action.toastId
      if (id) {
        if (toastTimeouts.has(id)) clearTimeout(toastTimeouts.get(id))
        return { ...state, toasts: state.toasts.filter((t) => t.id !== id) }
      }
      return { ...state, toasts: [] }
    }
    case actionTypes.REMOVE_TOAST:
      return { ...state, toasts: action.toastId ? state.toasts.filter((t) => t.id !== action.toastId) : [] }
    default:
      return state
  }
}

const listeners: Array<(state: State) => void> = []
let memoryState: State = { toasts: [] }

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => listener(memoryState))
}

export function toast({ title, description, variant }: Omit<ToasterToast, "id">) {
  const id = genId()
  const newToast = { id, title, description, variant }
  dispatch({ type: actionTypes.ADD_TOAST, toast: newToast })
  setTimeout(() => dispatch({ type: actionTypes.DISMISS_TOAST, toastId: id }), TOAST_REMOVE_DELAY)
  return id
}

export function useToast() {
  const [state, setState] = React.useState<State>(memoryState)

  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) listeners.splice(index, 1)
    }
  }, [])

  return {
    toasts: state.toasts,
    dismiss: (toastId?: string) => dispatch({ type: actionTypes.DISMISS_TOAST, toastId }),
    toast,
  }
}
