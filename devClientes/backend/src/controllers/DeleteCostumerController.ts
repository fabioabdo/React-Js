import { FastifyRequest, FastifyReply } from "fastify"
import { DeleteCustomerService } from "../services/DeleteCustomerService"

class DeleteCustomerController {

    async handle(reuest: FastifyRequest, reply: FastifyReply) {

        const {id} = reuest.query as { id: string }
        const deleteCustomerService = new DeleteCustomerService
        const customers = await deleteCustomerService.execute({ id })

        reply.send(deleteCustomerService)
    }
}

export { DeleteCustomerController }