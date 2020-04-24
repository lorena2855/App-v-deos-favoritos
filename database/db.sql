
CREATE DATABASE videosFav;

use videosFav;


CREATE TABLE video (
  id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  description VARCHAR(100) NOT NULL,
  category VARCHAR(15),
  date ATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP 
);

show tables;

describe video;


