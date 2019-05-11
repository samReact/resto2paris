DROP TABLE IF EXISTS restaurants;

CREATE TABLE restaurants 
( 
    id SMALLINT PRIMARY KEY  AUTO_INCREMENT,  
    name VARCHAR(100),  
    address1 VARCHAR(100),
    address2 VARCHAR(100),   
    area VARCHAR(100),  
    city VARCHAR(100),  
    mainCategory VARCHAR(100),  
    secondaryCategory VARCHAR(255),  
    editorial_rating TINYINT ,  
    description TEXT,  
    annotation TEXT ,  
    owner_annotation TEXT ,  
    to_website TEXT ,  
    image_url TEXT  ,  
    latitude FLOAT,  
    longitude FLOAT 
    
); 


DROP TABLE IF EXISTS users;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE users (
  id int(11) NOT NULL AUTO_INCREMENT,
  email varchar(90) DEFAULT NULL,
  password varchar(90) DEFAULT NULL,
  name varchar(90) DEFAULT NULL,
  lastname varchar(90) DEFAULT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY email (email)
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--

