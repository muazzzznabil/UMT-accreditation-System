
select * from maklumatprogram;

delete from maklumatprogram;

-- select * from maklumatprogram WHERE id = 1;

delete from maklumatprogram where sektor_akademi = "Artificial Intelligence";

CREATE TABLE maklumat_program (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama_program VARCHAR(255), 
    tahapMQF VARCHAR(255),
    sektorAkademik VARCHAR(255),
    code_nec VARCHAR(255),
    mode_penawaran VARCHAR(255),
    fakulti VARCHAR(255),
    Sepenuh_max_Tahun VARCHAR(255),
    Sepenuh_max_Minggu VARCHAR(255),
    Sepenuh_max_Semester VARCHAR(255),
    Sepenuh_min_Tahun VARCHAR(255),
    Sepenuh_min_Minggu VARCHAR(255),
    Sepenuh_min_Semester VARCHAR(255),
    Sepenuh_SemesterPanjang_Semester VARCHAR(255),
    Sepenuh_SemesterPendek_Semester VARCHAR(255),
    Sepenuh_LatihanIndustri_Semester VARCHAR(255),
    Separuh_max_Tahun VARCHAR(255),
    Separuh_max_Minggu VARCHAR(255),
    Separuh_max_Semester VARCHAR(255),
    Separuh_min_Tahun VARCHAR(255),
    Separuh_min_Minggu VARCHAR(255),
    Separuh_min_Semester VARCHAR(255),
    Separuh_SemesterPanjang_Semester VARCHAR(255),
    Separuh_SemesterPendek_Semester VARCHAR(255),
    Separuh_LatihanIndustri_Semester VARCHAR(255),
    mod_penyampaian SET('Konvensional/Terbuka', 'Jarak Jauh (ODL)'),
    struktur_program VARCHAR(255),
    program_kerjasama VARCHAR(255),
    jenis_kerjasama VARCHAR(255)
);

DROP TABLE maklumat_program;

DROP TABLE mesy_jpkt;


create table mesy_jpkt (
    id INT AUTO_INCREMENT PRIMARY KEY,
    maklumat_program_id INT,
    tarikh_surat DATE,
    tarikh_terima_surat DATE,
    tempoh_sah int,
    sah_sehingga DATE,
    tarikh_mesyuarat DATE,
    bil_mesyuarat VARCHAR(255),
    minit_jpkt VARCHAR(255),

);

SELECT id,nama_program,fakulti FROM maklumat_program;

ALTER TABLE maklumat_program
ADD COLUMN tarikhSurat DATE,
ADD COLUMN tarikhTerimaSurat DATE,
ADD COLUMN tarikhMesyuarat DATE,
ADD COLUMN tempohSah INT,
ADD COLUMN sahSehingga DATE,
ADD COLUMN bilMesyuarat VARCHAR(255),
ADD COLUMN minitJPKT BLOB;

show columns from maklumat_program;

create table testTable (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama VARCHAR(255),
    file VARCHAR(255),
    eduInfo TEXT
);