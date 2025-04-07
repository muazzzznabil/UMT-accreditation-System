
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

SELECT * FROM maklumat_program WHERE id = 27;

CREATE TABLE evaluator (
    id INT AUTO_INCREMENT PRIMARY KEY,
    evaluator_name VARCHAR(255),
    evaluator_email VARCHAR(255),
    evaluator_phone VARCHAR(255),
    evaluator_faculty VARCHAR(255),
    evaluator_position VARCHAR(255),
    evaluator_status VARCHAR(255),
    evaluator_field VARCHAR(255),
    evaluator_appointment_date DATE,
    program_id INT,
    FOREIGN KEY (program_id) REFERENCES maklumat_program(id)
);

select * from evaluator;

create Table accreditation (
    accreditation_id INT AUTO_INCREMENT PRIMARY KEY,
    program_id INT,
    uploadDate DATE,
    accreditationType VARCHAR(255),
    accreditationStartDate DATE,
    accreditationEndDate DATE,
    accreditationStatus VARCHAR(255),
    accreditationExtensionNumber int,
    accreditationFilePath DATE,
    FOREIGN KEY (program_id) REFERENCES maklumat_program(id)
    
    
)

create Table accreditation_application(
    id int AUTO_INCREMENT PRIMARY KEY,
    program_id INT,
    application_status INT,
    application_type VARCHAR(255),
    application_path VARCHAR(255),
    application_submission_date DATE,
    FOREIGN KEY (program_id) REFERENCES maklumat_program(id)
)

SELECT * FROM accreditation_application;

    SELECT 
      accreditation_application.*,
      maklumat_program.nama_program AS program_name
    FROM 
      accreditation_application
    INNER JOIN 
      maklumat_program ON accreditation_application.program_id = maklumat_program.id



create table mqa_feedback(
    id INT AUTO_INCREMENT PRIMARY KEY,
    program_id INT,
    application_id INT,
    feedback_documents_path VARCHAR(255),
    comment TEXT,
    feedback_date DATE,
    FOREIGN KEY (program_id) REFERENCES maklumat_program(id),
    FOREIGN KEY (application_id) REFERENCES accreditation_application(id)
)

 INSERT INTO mqa_feedback (
    program_id,
    application_id,
    feedback_documents_path,
    comment,
    feedback_date,
    is_fined
) VALUES (
    '22', 
    '9', 
    '/uploads/mqaFeedback/GARIS-PANDUAN-LI-FTKKI-edit-v2_undefined.pdf', 
    'Dokument tidak Mencukupi 1', 
    '2025-03-06', 
    '1'
)

    SELECT maklumat_program.nama_program,accreditation_application.application_type
    FROM maklumat_program
    INNER JOIN accreditation_application ON maklumat_program.id = accreditation_application.program_id
    WHERE accreditation_application.id = 11

DELETE FROM accreditation_application WHERE id IN (11,10)

SELECT program_id, id, application_id FROM mqa_feedback

ALTER TABLE mqa_feedback
ADD CONSTRAINT fk_application_id
FOREIGN KEY (application_id)
REFERENCES accreditation_application(id)
ON DELETE CASCADE;

  SELECT 
      maklumat_program.nama_program,
      accreditation_application.application_type,
      accreditation_application.application_status,
      mqa_feedback.*
    FROM 
      maklumat_program
    INNER JOIN 
      accreditation_application ON maklumat_program.id = accreditation_application.program_id
    INNER JOIN
      mqa_feedback ON accreditation_application.id = mqa_feedback.application_id
    WHERE 
      accreditation_application.id =9

      SELECT * FROM mqa_feedback WHERE application_id = 9

    CREATE Table payment (
        id INT AUTO_INCREMENT PRIMARY KEY,
        program_id INT,
        application_id INT,
        payment_date DATE,
        payment_amount DECIMAL(10, 2),
        payment_status VARCHAR(255),
        payment_proof_path VARCHAR(255),
        payment_method VARCHAR(255),
        payment_description TEXT,
        payment_type VARCHAR(255),
        records_timeStamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (program_id) REFERENCES maklumat_program(id),
        FOREIGN KEY (application_id) REFERENCES accreditation_application(id)
    )

    (22, 9, '2022-01-01', 100.00, 'pending', 'payment_proof_1.pdf', 'bank_transfer', 'description for payment 1', 'Accreditation Fee'),
    (24, 12, '2022-01-15', 50.00, 'paid', 'payment_proof_2.pdf', 'online_payment', 'description for payment 2', 'Fined by MQA Fee')

SELECT * FROM payment WHERE program_id = '22'

SELECT mp.*, e.evaluator_name 
FROM maklumat_program mp 
JOIN evaluator e ON mp.id = e.program_id 
WHERE e.evaluator_name LIKE '%zawawi%';


SELECT nama_program 
FROM maklumat_program 
WHERE fakulti LIKE '%FSSM%';

SELECT
  mp.nama_program,
  SUM(p.payment_amount) AS jumlah_bayaran
FROM maklumat_program mp
JOIN accreditation_application aa ON mp.id = aa.program_id
JOIN payment p ON aa.id = p.application_id
WHERE
  mp.nama_program LIKE '%Data Analytics%'
GROUP BY
  mp.nama_program;

SELECT
  -- payment_amount,
  -- payment_date,
  -- payment_method,
  -- payment_description,
  -- payment_type
  *
FROM payment
WHERE program_id IN ('20', '24', '22')

SELECT
  p.nama_program,
  pay.payment_amount
FROM maklumat_program AS p
JOIN accreditation_application AS app
  ON p.id = app.program_id
JOIN payment AS pay
  ON app.id = pay.application_id
WHERE
  p.nama_program LIKE '%Sarjana Data Analytics With Honours%';

  
SELECT
  mp.nama_program,
  aa.application_type,
  aa.application_path,
  aa.application_submission_date,
  aa.application_status
FROM maklumat_program AS mp
JOIN accreditation_application AS aa
  ON mp.id = aa.program_id
WHERE
  mp.nama_program LIKE '%informatik maritim%';


  select * FROM accreditation WHERE program_id = 22


  select * from payment

  SELECT * FROM accreditation_application WHERE program_id = 24 AND application_status IN ('approved', 'rejected')
  