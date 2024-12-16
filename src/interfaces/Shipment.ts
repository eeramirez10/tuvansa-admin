export interface ShippmentResponse {
  shipments: Shipment[];
}

export interface Shipment {
  factura:       string;
  remision:      string;
  ruta:          string;
  druta:         string;
  fecha:         string;
  codigoCliente: string;
  nombreCliente: string;
  agente:        string;
  costo:         string;
  estado:        string;
  fechaFolio:    string;
  referencia:    string;
  detail:        Detail[] | null;
}

export interface Detail {
  factura:    string;
  remision:   string;
  ruta:       string;
  druta:      string;
  costo:      string;
  estado:     string;
  referencia: string;
}