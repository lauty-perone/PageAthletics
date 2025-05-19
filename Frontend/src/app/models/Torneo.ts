export interface Tournament {
    idTorneo?: number;
    name: string;
    fechaTorneo: Date;
    lugar: string;
    resultadosUrl?: string;
    fechaInicioInscripcion: Date;
    fechaFinInscripcion: Date;
    cantidadCarriles: number;
    pruebas: string[];
  }