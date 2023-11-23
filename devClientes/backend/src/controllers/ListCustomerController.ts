import { FastifyRequest, FastifyReply } from "fastify"
import {ListCustumerService} from "../services/ListCustomerService"

class ListCustomerController{

    async handle(reuest: FastifyRequest, reply: FastifyReply){

        const ListCustomerService = new ListCustumerService
        const customers =  await ListCustomerService.excecute()

        reply.send(customers)
    }
}

export {ListCustomerController}

