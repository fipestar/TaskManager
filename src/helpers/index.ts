export default function formatDate(dateStr: string): string {
    const dateObj = new Date(dateStr)
    const options: Intl.DateTimeFormatOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    }
    return new Intl.DateTimeFormat("es-ES", options).format(dateObj)
}

export function getNameById<T extends { id: string; name: string}>(
    list: T[],
    id: string
) : string {
    const item = list.find((el) => el.id === id)
    return item ? item.name : id
}

export function getItemById<T extends { id: string }>(
    list: T[],
    id: string
) : T | undefined {
    return list.find((el) => el.id === id)
}