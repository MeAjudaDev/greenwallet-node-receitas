import { parse, format, subDays } from 'date-fns'

const convertDateToDB = (date: string) => {
    return format(parse(date, "dd/MM/yyyy", new Date()), "yyyy/MM/dd")
}

const convertDBDateToNormal = (date: string) => {
    return new Date(date).toLocaleDateString('pt-BR')
}

const newDateFormated = () => {
    return format(new Date(), "yyyy/MM/dd")
}

const subtractDaysDateCurrent = (days: number) => {
    return format(subDays(new Date(), Number(days)), "yyyy/MM/dd")
}

export {
    convertDateToDB,
    newDateFormated,
    subtractDaysDateCurrent,
    convertDBDateToNormal
}
