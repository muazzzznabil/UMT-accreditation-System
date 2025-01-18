 export class MesyJKPT {
  private mesyJKPT: {
    id: number;
    tarikhSurat: Date;
    tarikhTerimaSurat: Date;
    tarikhMesyuarat: Date;
    tempohSah: number;
    sahSehingga: Date;
    bilMesyuarat: string;
    minitJKPT: string | null;
  };

  constructor() {
    this.mesyJKPT = {
      id: 0,
      tarikhSurat: new Date(),
      tarikhTerimaSurat: new Date(),
      tarikhMesyuarat: new Date(),
      tempohSah: 0,
      sahSehingga: new Date(),
      bilMesyuarat: "",
      minitJKPT: null,
    };
  }

  // Setter and Getter for id
  setId(id: number): void {
    this.mesyJKPT.id = id;
  }

  getId(): number {
    return this.mesyJKPT.id;
  }

  // Setter and Getter for tarikhSurat
  setTarikhSurat(value: Date): void {
    this.mesyJKPT.tarikhSurat = value;
  }

  getTarikhSurat(): Date {
    return this.mesyJKPT.tarikhSurat;
  }

  // Setter and Getter for tarikhTerimaSurat
  setTarikhTerimaSurat(value: Date): void {
    this.mesyJKPT.tarikhTerimaSurat = value;
  }

  getTarikhTerimaSurat(): Date {
    return this.mesyJKPT.tarikhTerimaSurat;
  }

  // Setter and Getter for tarikhMesyuarat
  setTarikhMesyuarat(value: Date): void {
    this.mesyJKPT.tarikhMesyuarat = value;
  }

  getTarikhMesyuarat(): Date {
    return this.mesyJKPT.tarikhMesyuarat;
  }

  // Setter and Getter for tempohSah
  setTempohSah(value: number): void {
    this.mesyJKPT.tempohSah = value;
  }

  getTempohSah(): number {
    return this.mesyJKPT.tempohSah;
  }

  // Setter and Getter for sahSehingga
  setSahSehingga(value: Date): void {
    this.mesyJKPT.sahSehingga = value;
  }

  getSahSehingga(): Date {
    return this.mesyJKPT.sahSehingga || new Date(); // Default to the current date if it's null or undefined.
  }

  // Setter and Getter for bilMesyuarat
  setBilMesyuarat(value: string): void {
    this.mesyJKPT.bilMesyuarat = value;
  }

  getBilMesyuarat(): string {
    return this.mesyJKPT.bilMesyuarat;
  }

  // Setter and Getter for minitJKPT
  setMinitJKPT(value: string | null): void {
    this.mesyJKPT.minitJKPT = value;
  }

  getMinitJKPT(): string| null {
    return this.mesyJKPT.minitJKPT;
  }
}
