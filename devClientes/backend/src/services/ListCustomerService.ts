import prismaclient from "../prisma";

class ListCustumerService {

    async excecute() {
        
        const customers = prismaclient.customer.findMany()

        return customers
    }


}

export {ListCustumerService}