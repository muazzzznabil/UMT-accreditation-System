
select * from maklumat_program;

delete from maklumatprogram;

-- select * from maklumatprogram WHERE id = 1;

delete from maklumat_program where sektor_akademi = "Artificial Intelligence";

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
ADD COLUMN tarikMesyJKA DATE,
ADD COLUMN bilMesyuaratJKA VARCHAR(255),
ADD COLUMN MinitJKA VARCHAR(255);,


show columns from maklumat_program;

create table testTable (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama VARCHAR(255),
    file VARCHAR(255),
    eduInfo TEXT
);

SELECT * FROM testTable;

alter table

show COLUMNS FROM testTable;

SELECT COUNT(*) AS total_columns FROM information_schema.columns WHERE table_name = 'maklumat_program';


INSERT INTO maklumat_program 
(
  nama_program, tahapMQF, sektorAkademik, code_nec, mode_penawaran, fakulti,
  Sepenuh_max_Tahun, Sepenuh_max_Minggu, Sepenuh_max_Semester, Sepenuh_min_Tahun,
  Sepenuh_min_Minggu, Sepenuh_min_Semester, Sepenuh_SemesterPanjang_Semester,
  Sepenuh_SemesterPendek_Semester, Sepenuh_LatihanIndustri_Semester, Separuh_max_Tahun,
  Separuh_max_Minggu, Separuh_max_Semester, Separuh_min_Tahun, Separuh_min_Minggu,
  Separuh_min_Semester, Separuh_SemesterPanjang_Semester, Separuh_SemesterPendek_Semester,
  Separuh_LatihanIndustri_Semester, mod_penyampaian, struktur_program, program_kerjasama,
  jenis_kerjasama, tarikhSurat, tarikhTerimaSurat, tarikhMesyuarat, tempohSah,
  sahSehingga, bilMesyuarat, minitJKPT, tarikMesyJKA, bilMesyuaratJKA, minitJKA
) 
VALUES (
  'Software Engineering', '7', 'Sarjana secara kerja kursus', '0011: Basic programmes and qualifications',
  'Mod Industri', 'Fakulti Teknologi Kejuruteraan Kelautan (FTKK)', '3', '3', '3', '3',
  '2', '2', '3', '3', '3', '4', '4', '3', '4', '4', '2', '4', '5', '4', 'on',
  'Major-minor', 'True', 'Ijazah Bersama (Joint Degree)', '2025-01-18', '2025-01-09',
  '2027-01-09', 2, '2027-01-09', '4/2025', '/uploads/documents/_uploads_documents_SRS_S65752 (1).pdf',
  '2025-01-17', '4/25','/uploads/documents/SRS_S65752.pdf'
);

