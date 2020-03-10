

CREATE TABLE cards
(
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    pid VARCHAR(255),
    uid VARCHAR(255),
    card VARCHAR(255),
    active boolean not null default 0,
    date DATETIME,
    PRIMARY KEY (id)
)
;

CREATE TABLE codes
(
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    pid VARCHAR(255),
    uid VARCHAR(255),
    code VARCHAR(255),
    active boolean not null default 0,
    date DATETIME,
    PRIMARY KEY (id)
)
;


CREATE TABLE facilites
(
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    name varchar(255),
    PRIMARY KEY (id)
)
;

CREATE TABLE readers
(
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    name varchar(255),
    facility INT NOT NULL REFERENCES facilites(id),
    direction varchar(255),
    PRIMARY KEY (id)
)
;

CREATE TABLE passages
(
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    user INT REFERENCES cards(id),
    card VARCHAR(255),
    reader INT NOT NULL REFERENCES readers(id),
    date DATETIME,
    PRIMARY KEY (id)
)
;