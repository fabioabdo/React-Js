import { FiTrash } from "react-icons/fi"
import { api } from "./services/api"
import { useEffect, useRef, useState, FormEvent } from "react"


interface customersProps {
  id: string
  name: string
  email: string
  status: boolean
  created_at: string
}

export default function App() {

  const [customers, setCustomers] = useState<customersProps[]>([])
  const nameRef = useRef<HTMLInputElement | null>(null)
  const emailRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    loadCustomers()
  }, [])

  async function loadCustomers() {
    const response = await api.get("/customers")
    setCustomers(response.data)
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!nameRef.current?.value || !emailRef.current?.value) return
    const response = await api.post("/customer", {
      name: nameRef.current?.value,
      email: emailRef.current?.value
    })
    setCustomers(allcustomers => [...allcustomers, response.data])
    nameRef.current.value = ""
    emailRef.current.value = ""
    nameRef.current.focus()
  }

  async function delCustomer(id: string) {
    try {
      await api.delete("/customer", {
        params: {
          id: id
        }
      })
      const allcusatomers = customers.filter((customers) => customers.id !== id)
      setCustomers(allcusatomers)

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="w-full min-h-screen bg-gray-900 flex justify-center px-4">
      <main className="my-9 w-full md:max-w-2xl ">
        <h1 className="text-4xl font-medium text-white">Clientes</h1>
        <form className="flex flex-col my-8" onSubmit={handleSubmit}>
          <label className="text-white">Nome</label>
          <input
            id="name"
            ref={nameRef}
            className="w-full mb-5 p-2 rounded "
            type="text"
            placeholder="digite seu nome completo" />
          <label
            className="text-white">E-mail
          </label>
          <input
            id="email"
            ref={emailRef}
            className="w-full mb-5 p-2 rounded "
            type="email"
            placeholder="digite seu email"
          />
          <input
            type="submit"
            value="cadastrar"
            className="cursor-pointer w-full p-2 bg-green-500 rounded font-medium"
          />
        </form>
        <section className="flex flex-col gap-4">
          {customers.map((customer) => (
            <article
              key={customer.id}
              className="w-full rounded bg-white p-2 relative hover:scale-105 duration-200">
              <p><span>Nome:</span> {customer.name}</p>
              <p><span>Email:</span> {customer.email}</p>
              <p><span>Status:</span> {customer.status ? "ATIVO" : "INATIVO"}</p>
              <button
                onClick={() => delCustomer(customer.id)}
                className="bg-red-500 w-7 h-7 flex justify-center items-center rounded-lg absolute right-0 -top-2">

                <FiTrash
                  size={15}
                  color="#fff"
                />
              </button>
            </article>
          ))}
        </section>
      </main>
    </div>
  )
}
