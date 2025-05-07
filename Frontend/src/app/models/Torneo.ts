export interface Tournament {
    idTorneo?: number;
    name: string;
    fechaTorneo: string;
    lugar: string;
    resultadosUrl?: string;
    fechaInicioInscripcion: string;
    fechaFinInscripcion: string;
    cantidadCarriles: number;
    pruebas: string[];
  }