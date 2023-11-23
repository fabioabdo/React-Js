import {format, parseISO} from "date-fns"
import { ptBR } from "date-fns/locale"

export default function convertDate(date: string){
    return format(parseISO(date), "dd/MM/yyyy HH:MM:SS", {
        locale: ptBR
    } )
}