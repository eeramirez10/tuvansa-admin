import { fetchWithoutToken } from "src/helpers/fetchWhithoutToken";
import { SalesResponse } from "src/interfaces/Sales";


export const getSales = async (): Promise<SalesResponse> => {

  const results = await fetchWithoutToken({ endpoint: 'proscai/sales' })


  return results;
}