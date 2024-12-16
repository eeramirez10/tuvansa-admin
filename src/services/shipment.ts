import { type ShipmentResponse } from '../interfaces/Shipment';
import { fetchWithoutToken } from '../helpers/fetchWhithoutToken';
import { METHOD_VALUES } from '../helpers/fetchWithToken';


export const getShipments = async (): Promise<ShipmentResponse> => {
  const resp = await fetchWithoutToken({endpoint:'proscai/shipments', method: METHOD_VALUES.GET})

  return resp
};