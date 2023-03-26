export interface INote {
    id: string
    text: string
}

export type setFunction<T> = (data: T | ((data: T) => T)) => void