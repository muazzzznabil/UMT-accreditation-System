export class MaklumatProgramModel {
     maklumat_program: {
        id: number;
        nama_program: string;
        tahapMQF: string;
        sektorAkademik: string;
        code_nec: string;
        mode_penawaran: string;
        fakulti: string;
        Sepenuh_max_Tahun: string;
        Sepenuh_max_Minggu: string;
        Sepenuh_max_Semester: string;
        Sepenuh_min_Tahun: string;
        Sepenuh_min_Minggu: string;
        Sepenuh_min_Semester: string;
        Sepenuh_SemesterPanjang_Semester: string;
        Sepenuh_SemesterPendek_Semester: string;
        Sepenuh_LatihanIndustri_Semester: string;
        Separuh_max_Tahun: string;
        Separuh_max_Minggu: string;
        Separuh_max_Semester: string;
        Separuh_min_Tahun: string;
        Separuh_min_Minggu: string;
        Separuh_min_Semester: string;
        Separuh_SemesterPanjang_Semester: string;
        Separuh_SemesterPendek_Semester: string;
        Separuh_LatihanIndustri_Semester: string;
        mod_penyampaian: string;
        struktur_program: string;
        program_kerjasama: string;
        jenis_kerjasama: string;
       
        
    };

    constructor() {
        this.maklumat_program = {
            id: 0,
            nama_program: '',
            tahapMQF: '',
            sektorAkademik: '',
            code_nec: '',
            mode_penawaran: '',
            fakulti: '',
            Sepenuh_max_Tahun: '',
            Sepenuh_max_Minggu: '',
            Sepenuh_max_Semester: '',
            Sepenuh_min_Tahun: '',
            Sepenuh_min_Minggu: '',
            Sepenuh_min_Semester: '',
            Sepenuh_SemesterPanjang_Semester: '',
            Sepenuh_SemesterPendek_Semester: '',
            Sepenuh_LatihanIndustri_Semester: '',
            Separuh_max_Tahun: '',
            Separuh_max_Minggu: '',
            Separuh_max_Semester: '',
            Separuh_min_Tahun: '',
            Separuh_min_Minggu: '',
            Separuh_min_Semester: '',
            Separuh_SemesterPanjang_Semester: '',
            Separuh_SemesterPendek_Semester: '',
            Separuh_LatihanIndustri_Semester: '',
            mod_penyampaian: '',
            struktur_program: '',
            program_kerjasama: '',
            jenis_kerjasama: '',
         
        };
    }

    // Getters and Setters
    getId(): number {
        return this.maklumat_program.id;
    }

    setId(id: number): void {
        this.maklumat_program.id = id;
    }

    getNamaProgram(): string {
        return this.maklumat_program.nama_program;
    }

    setNamaProgram(nama_program: string): void {
        this.maklumat_program.nama_program = nama_program;
    }

    getTahapMQF(): string {
        return this.maklumat_program.tahapMQF;
    }

    setTahapMQF(tahapMQF: string): void {
        this.maklumat_program.tahapMQF = tahapMQF;
    }

    getSektorAkademik(): string {
        return this.maklumat_program.sektorAkademik;
    }

    setSektorAkademik(sektorAkademik: string): void {
        this.maklumat_program.sektorAkademik = sektorAkademik;
    }

    getCodeNEC(): string {
        return this.maklumat_program.code_nec;
    }

    setCodeNEC(code_nec: string): void {
        this.maklumat_program.code_nec = code_nec;
    }

    getModePenawaran(): string {
        return this.maklumat_program.mode_penawaran;
    }

    setModePenawaran(mode_penawaran: string): void {
        this.maklumat_program.mode_penawaran = mode_penawaran;
    }

    getFakulti(): string {
        return this.maklumat_program.fakulti;
    }

    setFakulti(fakulti: string): void {
        this.maklumat_program.fakulti = fakulti;
    }

    getSepenuhMaxTahun(): string {
        return this.maklumat_program.Sepenuh_max_Tahun;
    }

    setSepenuhMaxTahun(Sepenuh_max_Tahun: string): void {
        this.maklumat_program.Sepenuh_max_Tahun = Sepenuh_max_Tahun;
    }

    getSepenuhMaxMinggu(): string {
        return this.maklumat_program.Sepenuh_max_Minggu;
    }

    setSepenuhMaxMinggu(Sepenuh_max_Minggu: string): void {
        this.maklumat_program.Sepenuh_max_Minggu = Sepenuh_max_Minggu;
    }

    getSepenuhMaxSemester(): string {
        return this.maklumat_program.Sepenuh_max_Semester;
    }

    setSepenuhMaxSemester(Sepenuh_max_Semester: string): void {
        this.maklumat_program.Sepenuh_max_Semester = Sepenuh_max_Semester;
    }

    getSepenuhMinTahun(): string {
        return this.maklumat_program.Sepenuh_min_Tahun;
    }

    setSepenuhMinTahun(Sepenuh_min_Tahun: string): void {
        this.maklumat_program.Sepenuh_min_Tahun = Sepenuh_min_Tahun;
    }

    getSepenuhMinMinggu(): string {
        return this.maklumat_program.Sepenuh_min_Minggu;
    }

    setSepenuhMinMinggu(Sepenuh_min_Minggu: string): void {
        this.maklumat_program.Sepenuh_min_Minggu = Sepenuh_min_Minggu;
    }

    getSepenuhMinSemester(): string {
        return this.maklumat_program.Sepenuh_min_Semester;
    }

    setSepenuhMinSemester(Sepenuh_min_Semester: string): void {
        this.maklumat_program.Sepenuh_min_Semester = Sepenuh_min_Semester;
    }

    getSepenuhSemesterPanjangSemester(): string {
        return this.maklumat_program.Sepenuh_SemesterPanjang_Semester;
    }

    setSepenuhSemesterPanjangSemester(Sepenuh_SemesterPanjang_Semester: string): void {
        this.maklumat_program.Sepenuh_SemesterPanjang_Semester = Sepenuh_SemesterPanjang_Semester;
    }

    getSepenuhSemesterPendekSemester(): string {
        return this.maklumat_program.Sepenuh_SemesterPendek_Semester;
    }

    setSepenuhSemesterPendekSemester(Sepenuh_SemesterPendek_Semester: string): void {
        this.maklumat_program.Sepenuh_SemesterPendek_Semester = Sepenuh_SemesterPendek_Semester;
    }

    getSepenuhLatihanIndustriSemester(): string {
        return this.maklumat_program.Sepenuh_LatihanIndustri_Semester;
    }

    setSepenuhLatihanIndustriSemester(Sepenuh_LatihanIndustri_Semester: string): void {
        this.maklumat_program.Sepenuh_LatihanIndustri_Semester = Sepenuh_LatihanIndustri_Semester;
    }

    getSeparuhMaxTahun(): string {
        return this.maklumat_program.Separuh_max_Tahun;
    }

    setSeparuhMaxTahun(Separuh_max_Tahun: string): void {
        this.maklumat_program.Separuh_max_Tahun = Separuh_max_Tahun;
    }

    getSeparuhMaxMinggu(): string {
        return this.maklumat_program.Separuh_max_Minggu;
    }

    setSeparuhMaxMinggu(Separuh_max_Minggu: string): void {
        this.maklumat_program.Separuh_max_Minggu = Separuh_max_Minggu;
    }

    getSeparuhMaxSemester(): string {
        return this.maklumat_program.Separuh_max_Semester;
    }

    setSeparuhMaxSemester(Separuh_max_Semester: string): void {
        this.maklumat_program.Separuh_max_Semester = Separuh_max_Semester;
    }

    getSeparuhMinTahun(): string {
        return this.maklumat_program.Separuh_min_Tahun;
    }

    setSeparuhMinTahun(Separuh_min_Tahun: string): void {
        this.maklumat_program.Separuh_min_Tahun = Separuh_min_Tahun;
    }

    getSeparuhMinMinggu(): string {
        return this.maklumat_program.Separuh_min_Minggu;
    }

    setSeparuhMinMinggu(Separuh_min_Minggu: string): void {
        this.maklumat_program.Separuh_min_Minggu = Separuh_min_Minggu;
    }

    getSeparuhMinSemester(): string {
        return this.maklumat_program.Separuh_min_Semester;
    }

    setSeparuhMinSemester(Separuh_min_Semester: string): void {
        this.maklumat_program.Separuh_min_Semester = Separuh_min_Semester;
    }

    getSeparuhSemesterPanjangSemester(): string {
        return this.maklumat_program.Separuh_SemesterPanjang_Semester;
    }

    setSeparuhSemesterPanjangSemester(Separuh_SemesterPanjang_Semester: string): void {
        this.maklumat_program.Separuh_SemesterPanjang_Semester = Separuh_SemesterPanjang_Semester;
    }

    getSeparuhSemesterPendekSemester(): string {
        return this.maklumat_program.Separuh_SemesterPendek_Semester;
    }

    setSeparuhSemesterPendekSemester(Separuh_SemesterPendek_Semester: string): void {
        this.maklumat_program.Separuh_SemesterPendek_Semester = Separuh_SemesterPendek_Semester;
    }

    getSeparuhLatihanIndustriSemester(): string {
        return this.maklumat_program.Separuh_LatihanIndustri_Semester;
    }

    setSeparuhLatihanIndustriSemester(Separuh_LatihanIndustri_Semester: string): void {
        this.maklumat_program.Separuh_LatihanIndustri_Semester = Separuh_LatihanIndustri_Semester;
    }

    getModPenyampaian(): string {
        return this.maklumat_program.mod_penyampaian;
    }

    setModPenyampaian(mod_penyampaian: string): void {
        this.maklumat_program.mod_penyampaian = mod_penyampaian;
    }

    getStrukturProgram(): string {
        return this.maklumat_program.struktur_program;
    }

    setStrukturProgram(struktur_program: string): void {
        this.maklumat_program.struktur_program = struktur_program;
    }

    getProgramKerjasama(): string {
        return this.maklumat_program.program_kerjasama;
    }

    setProgramKerjasama(program_kerjasama: string): void {
        this.maklumat_program.program_kerjasama = program_kerjasama;
    }

    getJenisKerjasama(): string {
        return this.maklumat_program.jenis_kerjasama;
    }

    setJenisKerjasama(jenis_kerjasama: string): void {
        this.maklumat_program.jenis_kerjasama = jenis_kerjasama;
    }
}