import { GoogleGenAI } from "@google/genai";
import { config } from "dotenv";
import express from "express";
import db from "../data/database.js";

config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  // apiKey: "AIzaSyCSg0n3OhQQZYriF_qwKafj47wW0gR-xLQ",
});
const databaseConfig = {
  temperature: 0.7,
  topP: 0.7,
  maxOutputTokens: 4096,
};
const chatbotConfig = {
  temperature: 0.9,
  topP: 0.9,
  maxOutputTokens: 65536,
};
async function chatbotGoogle(req, res) {
  const { user_prompt } = req.body;
  try {
    const response = await ai.models.generateContent({
      // model: "gemini-2.5-pro-exp-03-25",
      model: "gemini-2.0-flash",
      databaseConfig,
      contents: `
      You are an expert SQL analyst and database query generator.
      Your task is to analyze the provided database schema and the user's question, then generate a syntactically correct SQL query that accurately answers the question using MySQL syntax.
      I want you to return plain MySQL code 
      IMPORTANTT!! : DO NOT WRAP THE SQL OUTPUT IN SQL MARKDOWN
      example of the SQL code i want to generate is: SELECT * FROM maklumat_program WHERE id = 1;
      correct the spelling if you think the spelling is wrong

      i hate this code:
"sql\nSELECT\n  
  CONCAT(\n    
      'Years: ', Sepenuh_min_Tahun,
       ' - ', Sepenuh_max_Tahun,\n   
            ', Weeks: ', Sepenuh_min_Minggu, 
            ' - ', Sepenuh_max_Minggu,\n      
              ', Semesters: ', Sepenuh_min_Semester, 
              ' - ', Sepenuh_max_Semester\n    ) 
              AS full_time_duration\nFROM\n   
               maklumat_program;\n"

        i dont want to see any \n in the answer


      
        database:
        maklumat_program(
        id INT PRIMARY KEY,
        nama_program VARCHAR(255), : The name of the program
        tahapMQF VARCHAR(255), : The MQF level of the program "8"
        sektorAkademik VARCHAR(255), : The academic sector of the program "Sarjana secara kerja kursus"
        code_nec VARCHAR(255), : The NEC code of the program example "0212: Fashion, interior and industrial design"
        mode_penawaran VARCHAR(255), : The offer mode of the program example "Mod Industri"
        fakulti VARCHAR(255), : The faculty of the program
        Sepenuh_max_Tahun VARCHAR(255), : The full-time study count of years for the program
        Sepenuh_max_Minggu VARCHAR(255), : The full-time study count of weeks for the program
        Sepenuh_max_Semester VARCHAR(255), : The full-time study count of semesters for the program
        Sepenuh_min_Tahun VARCHAR(255), : The full-time minimum number of years for the program
        Sepenuh_min_Minggu VARCHAR(255), : The full-time minimum number of weeks for the program
        Sepenuh_min_Semester VARCHAR(255), : The full-time minimum number of semesters for the program
        Sepenuh_SemesterPanjang_Semester VARCHAR(255), : The full-time long semester count for the program
        Sepenuh_SemesterPendek_Semester VARCHAR(255), : The full-time short semester count for the program
        Sepenuh_LatihanIndustri_Semester VARCHAR(255), : The full-time industrial training count for the program
        Separuh_max_Tahun VARCHAR(255), : The part-time study count of years for the program
        Separuh_max_Minggu VARCHAR(255), : The part-time study count of weeks for the program
        Separuh_max_Semester VARCHAR(255), : The part-time study count of semesters for the program
        Separuh_min_Tahun VARCHAR(255), : The part-time minimum number of years for the program
        Separuh_min_Minggu VARCHAR(255), : The part-time minimum number of weeks for the program
        Separuh_min_Semester VARCHAR(255), : The part-time minimum number of semesters for the program
        Separuh_SemesterPanjang_Semester VARCHAR(255), : The part-time long semester count for the program
        Separuh_SemesterPendek_Semester VARCHAR(255), : The part-time short semester count for the program
        Separuh_LatihanIndustri_Semester VARCHAR(255), : The part-time industrial training count for the program
        konvensional VARCHAR(255), : The conventional study mode for the program
        struktur_program VARCHAR(255), : The program structure example" Major dengan Pengkhususan"
        program_kerjasama VARCHAR(255), : The program kerjasama example "True"
        jenis_kerjasama VARCHAR(255), : The type of kerjasama example "Kerjasama Antarabangsa"
        tarikhSurat date, : The date of the MSA letter generated by the MQA
        tarikhTerimaSurat date, : The date of the MSA letter received by the UMT
        tarikhMesyuarat date, : The date of the meeting of the MSA 
        tempohSah int : The valid period count in years of the MSA letter
        sahSehingga date, : The validity date of the MSA letter added with the tempohSah and tarikhSurat
        bilMesyuarat VARCHAR(255), : The meeting number of the JKPT meeting eg: "1/2021"
        minitJKPT VARCHAR(255), : The minutes Document of the JKPT meeting eg: "/uploads/documents/file_undefined.pdf"
        tarikMesyJKA date, : The date of the meeting of the JKA
        bilMesyuaratJKA VARCHAR(255), : The meeting number of the JKA meeting eg: "1/2021"
        minitJKA VARCHAR(255), : The minutes Document of the JKA meeting eg: "/uploads/documents/file_undefined.pdf"
        odl VARCHAR(255), : The ODL status of the program eg: "True" 
        )

        accreditation_application(
        id INT PRIMARY KEY,: The id of the accreditation application
        program_id INT,: The id of the program
        application_status VARCHAR(255),: The status of the accreditation application
        application_type VARCHAR(255),: The type of the accreditation application
        application_path date,: The path of the accreditation application in the server eg: "/uploads/documents/file_undefined.pdf"
        application_submission_date date,: The date of the submission of the accreditation application
        )

        evaluator(
        id INT PRIMARY KEY,: The id of the evaluator
        evaluator_name VARCHAR(255),: The name of the evaluator
        evaluator_email VARCHAR(255),: The email of the evaluator
        evaluator_phone VARCHAR(255),: The phone number of the evaluator
        evaluator_faculty VARCHAR(255),: The faculty of the evaluator
        evaluator_position VARCHAR(255),: The position of the evaluator value : "Ketua Panel Penilai Dalaman" or "Ahli Panel Penilai Dalaman" 
        evaluator_status VARCHAR(255),: The status of the evaluator whether active or inactive
        evaluator_field VARCHAR(255),: The field of the evaluator
        evaluator_appointment_date date,: The date of the appointment of the evaluator
        program_id INT,: The id of the program act as a foreign key
        evaluator_end_date date,: The end date of the evaluator
        evaluator_appointment_period int,: The period of the appointment of the evaluator
        )

        mqa_feedback(
        id INT PRIMARY KEY,: The id of the MQA feedback
        program_id INT,: The id of the program act as a foreign key
        application_id INT,: The id of the accreditation application act as a foreign key
        feedback_documents_path VARCHAR(255),: The path of the feedback document in the server eg: "/uploads/documents/file_undefined.pdf"
        comment TEXT ,: The comment of the feedback
        feedback_date date,: The date of the feedback
        is_fined tinyint,: The fine status of the feedback if the feedback has a fine or not
        )

        payment(
        id INT PRIMARY KEY,: The id of the payment
        application_id INT,: The id of the accreditation application act as a foreign key
        payment_date date,: The date of the payment
        payment_amount decimal(10,2),: The amount of the payment
        payment_proof_path VARCHAR(255),: The path of the payment proof in the server eg: "/uploads/documents/file_undefined.pdf"
        payment_method VARCHAR(255),: The method of the payment
        payment_description TEXT,: The description of the payment
        payment_type VARCHAR(255),: The type of the payment
        records_timeStamp timestamp,: The time and date when the records was created of the payment
        )

        Strict Rules:
        1. if the command search for specific name you can use LIKE  in the query to get better result and surround with %item%
        2. fetch the detailed data example : if asked to fetch nec code, you can also fetch the data of the nec code and the name of it and any relevant data
        3. use join whenever possible 
        4. Use LIKE when searching for specific data and ignore cases
        5. also fetch the request where when fetching data and include nama_program in query
        6. When using LIKE ALWAYS also use %items% to make it more precise AND always ignore cases
      


        command : ${user_prompt}

      `,
    });
    // res.status(200).json({ text: response.text });

    console.info("USER PROMPT:", user_prompt);

    let generatedQuery = response.text.replace(/```sql|```/g, "").trim();
    console.warn("Generated Query:", generatedQuery);

    let responseDB = {};

    try {
      const reponses = await db.query(generatedQuery);
      responseDB = reponses[0];
    } catch (error) {
      console.log("error", error);
      responseDB = reponses[0];
    }

    const chatReply = await ai.models.generateContent({
      model: "gemini-2.5-pro-exp-03-25",
      chatbotConfig,
      contents: `
      
      Explain the results in Professional English imagine you are a chatbot for a system. here is your the result that you need to process  ${JSON.stringify(
        responseDB
      )}. 
      
      The user question is : ${user_prompt}

      based on the json that you get from the database you need to use the answer in the given  ${JSON.stringify(
        responseDB
      )}. to answer the user question .


      STRICT RULES! :
      1. as a chatbox you need to explain the result in a professional way to the user.
      2. reply as if you are chatting with  the user 
      3. convert the table field with the proper name example sahSehingga will be converted to Expiry Date
      4. hide the SQL code from the user and only show the result in a professional way no thing like  2080-01-09T16:00:00.000Z that wil confuse the user 
      5. answer based on the user question and the result must be simple and easy to understand 
      6. Don't tell the user you problem that you have just answer the user question in a professional way
      7. The currency is in MYR
      8. Don't explain the abbreviation in the answer 
      9. Don't tell what the abbreviation mean in the answer
      10.Don't tell what NEC mean
      11. example that i hate:
       "the information I have doesn't specify the duration or whether this program is offered"
      12.You must use html tags and element if you want to create list(style list using tailwind to create a bullet point) table or want to bold words or data 
      13.The space is limited if ask for multiple table list please make it one by one and make the column count more than row count
      14. forbid the use of asterisk to bold or make a bullet point only use html
      15. when column of the table that you created  has  3 column or more separate it into multiple table
      16. when creating table use white colored font to make it more visible and use contrast color for the background
      17. I forbid you wrapping with html markdown block just straight away html tags
      18. Be creative and decide using ordered list when needed, unordered list when needed or table when needed
      19. always  make the table overflow horizontally so the user can scroll
      20. If the question in malay answer in malay if in english answer in english
      21. if the result print out error of token exceed please reply that you have exceed the token limit and ask the user to reduce the query
      22. if the result print out sql error ask the user to retry the query
      23. If the result is file path use the link and start the link with http://localhost:5000/(file path goes here..) and open it in new tab

      The user question is : ${user_prompt}
      The database result is : ${JSON.stringify(responseDB)} 
      
      `,
    });

    console.table(chatReply.text);

    res.status(200).json({ text: chatReply.text });
  } catch (error) {
    console.error("Error generating content:", error);
    res.status(500).json({ error: "Failed to generate content" });
  }
}

export default chatbotGoogle;
