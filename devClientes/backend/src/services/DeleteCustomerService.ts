import prismaclient from "../prisma";

interface deleteCustomer {
    id: string
}

class DeleteCustomerService {

    async execute({ id }: deleteCustomer) {

        if (!id) {
            throw new Error("solicitacao invalida")
        }

        const customer = await prismaclient.customer.findFirst(
            {
                where: {
                    id: id
                }
            }
        )
        if (!customer) {
            throw new Error("Cliente nao existe")
        }

        await prismaclient.customer.delete({
            where: {
                id: customer.id
            }
        })

        return { message: "deletado com sucesso" }


    }

}

export { DeleteCustomerService }