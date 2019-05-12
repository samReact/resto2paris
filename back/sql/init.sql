DROP TABLE IF EXISTS restaurants;

CREATE TABLE restaurants ( 
    id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,  
    name VARCHAR(100),  
    address1 VARCHAR(100),
    address2 VARCHAR(100),   
    area VARCHAR(100),  
    city VARCHAR(100),  
    mainCategory VARCHAR(100),  
    secondaryCategory VARCHAR(255),  
    editorial_rating TINYINT,  
    description TEXT,  
    annotation TEXT,  
    owner_annotation TEXT,  
    to_website TEXT,  
    image_url TEXT,  
    latitude FLOAT,  
    longitude FLOAT
);


DROP TABLE IF EXISTS users;

CREATE TABLE users(
  id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  email varchar(90) NOT NULL,
  password varchar(90) NOT NULL,
  name varchar(90) NOT NULL,
  lastname varchar(90) NOT NULL,
  UNIQUE KEY email(email)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



DROP TABLE IF EXISTS favorites;

CREATE TABLE favorites
(
  user_id int(11) NOT NULL,
  restaurant_id int(11) NOT NULL,
  PRIMARY KEY (user_id, restaurant_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
