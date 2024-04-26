
create database students_data;
use students_data;

CREATE TABLE login_info (
    University_Roll_Number BIGINT(12) PRIMARY KEY,
    Student_Name VARCHAR(255),
    Password VARCHAR(255)
);
CREATE TABLE company_data (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    ctc DECIMAL(10, 2) NOT NULL,
    criteria VARCHAR(100) NOT NULL,
    role VARCHAR(255) NOT NULL,
    link varchar(255) ,
    pdf_data longblob,
    hired int not null default 0
);
select * from company_data;
drop table company_data;

CREATE TABLE faculty_login (
	name VARCHAR(255) NOT NULL,
    password VARCHAR(255)
);
    
CREATE TABLE student_data (
    UniversityRollNumber INT,
    Aggregate FLOAT
);

INSERT INTO student_data (UniversityRollNumber, Aggregate) VALUES
(1001, 85.5),
(1002, 78.2),
(1003, 90.0),
(1004, 82.7),
(1005, 88.9);

INSERT INTO login_info (University_Roll_Number, Student_Name, Password) VALUES
(711721104104, 'Sidharth','kite@123');
INSERT INTO db (`University Roll Numbe`r, Student Name, Gender, Branch, Marks -10th, Marks -12th, Aggregate %, No. of current backlogs, History of arrears, Mobile Number, Email ID, DAYSCHOLAR/HOSTEL, CURRENT RESIDENCE, Graduation Degree, College Name, Year of Passing)
VALUES (711721104112, 'Yeshwanth', 'Male', 'Computer Science', 61, 62, 6.1, 0, 0, '1234567890', 'yes@email', 'Daysholar', 'Nil', 'BE', 'KGISL', 2025);
INSERT INTO faculty_login values( "admin" , "kite#321" );


CREATE TABLE UserDetails (
    RegisterNumber BIGINT(20),
    Name VARCHAR(40),
    Gender VARCHAR(6),
    Branch VARCHAR(10),
	Marks10 INT,
	ModeOfStudy VARCHAR(10),
    Marks12orDiploma INT,
    CGPA INT,
    Backlogs INT,
    HistoryOfArrears INT,
    MobileNumber BIGINT, -- Using BIGINT for mobile numbers to accommodate larger numbers
    Email VARCHAR(60),
    Residence VARCHAR(10),
    Address VARCHAR(256),
    Degree VARCHAR(50), -- Adjusted length to accommodate larger degree names
    YearOfPassing INT,
    Domain VARCHAR(50) -- Adjusted length to accommodate larger domain names
);

CREATE TABLE UserDetails (
    RegisterNumber INT(20),
    Name VARCHAR(40),
    Gender VARCHAR(6),
    Branch VARCHAR(10),
    Marks12 INT,
    Marks10 INT,
    Diploma VARCHAR(5),
    CGPA INT,
    Backlogs INT,
    HistoryOfArrears INT,
    MobileNumber BIGINT, -- Using BIGINT for mobile numbers to accommodate larger numbers
    Email VARCHAR(60),
    Dayscholar VARCHAR(10),
    Hosteller VARCHAR(10),
    Address VARCHAR(256),
    Degree VARCHAR(50), -- Adjusted length to accommodate larger degree names
    YearOfPassing INT,
    Domain VARCHAR(50) -- Adjusted length to accommodate larger domain names
);

CREATE TABLE OfferLetters (
    RegisterNumber BIGINT(20) PRIMARY KEY,
    Company_name VARCHAR(255) NOT NULL,
    Offerletter LONGBLOB NOT NULL -- Assuming the Offerletter will be stored as a binary large object (BLOB)
);

CREATE TABLE SolutionData (
    RegisterNumber BIGINT(20),
    company_name VARCHAR(255), -- Name of the company associated with the question and solution
    round VARCHAR(255), -- Round of the question (e.g., Round 1, Round 2, etc.)
    question_description TEXT, -- Description of the question
    solution_type VARCHAR(255), 
    solution_data LONGBLOB 
);
create table placed_info (
	university_number bigint(20), 
    company_name varchar(50) , 
    role varchar(50), 
    ctc int );
CREATE TABLE pdf_documents (
  id INT AUTO_INCREMENT PRIMARY KEY,
  filename VARCHAR(255) NOT NULL,
  mime_type VARCHAR(255) NOT NULL,
  pdf_data LONGBLOB NOT NULL
);
CREATE TABLE EmailDetails (
    registerNumber bigint PRIMARY KEY,
    email VARCHAR(255) NOT NULL
);

ALTER TABLE SolutionData MODIFY COLUMN solution_type VARCHAR(2000);

select * from login_info;