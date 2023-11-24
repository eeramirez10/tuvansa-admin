interface CustomerProscai {
  uid: string
  name: string
  AGTNUM: string
  AGDESCR: string

}

export const getCustomersProscai = async ({ search }: { search: string }): Promise<CustomerProscai[]> => {
  const resp = await fetch(`http://localhost:4000/api/proscai/customers?search=${search}`)
  const items = await resp.json()
  return items
}
