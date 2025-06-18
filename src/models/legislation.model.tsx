export type LegislationSheetProps = {
  legislationId: string | null;
  onClose: () => void;
  visible: boolean;
};

export interface Legislation {
  id: number;
  title: string;
  article: string;
  date: string;
  link: string;
  places: {
    id: number;
    name: string;
    geojson?: {
      type: string;
      features: {
        type: string;
        properties: {
          nom: string;
          code: string;
          codeDepartement: string;
          siren: string;
          codeEpci: string;
          codeRegion: string;
          codesPostaux: string[];
          population: number;
        },
        geometry: {
          type: string;
          coordinates:[number, number][][][];
        }
      }[];
    }
  }[];
  fishingTypes: {
    id: number,
    name: string
  }[];
  fish: [];
}
