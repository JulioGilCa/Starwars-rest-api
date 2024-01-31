from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
        }


class People(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    group_id = db.Column(db.Integer)
    name = db.Column(db.String(120), unique=True, nullable=False)
    image_url = db.Column(db.String)
    gender = db.Column(db.String(30), unique=False, nullable=False)
    haircolor = db.Column(db.String)
    eyecolor = db.Column(db.String)

    def __repr__(self):
        return f'<People {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "group_id": self.group_id,
            "name": self.name,
            "image_url": self.image_url,
            "gender": self.gender,
            "haircolor": self.haircolor,
            "eyecolor": self.eyecolor,
        }


class Planet(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    group_id = db.Column(db.Integer)
    name = db.Column(db.String(120), unique=True, nullable=False)
    gravity = db.Column(db.String)
    climate = db.Column(db.String)
    image_url = db.Column(db.String)

    def __repr__(self):
        return f'<Planet {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "group_id": self.group_id,
            "name": self.name,
            "gravity": self.gravity,
            "climate": self.climate,
            "image_url": self.image_url
        }


class Vehicle(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    group_id = db.Column(db.Integer)
    name = db.Column(db.String(120), unique=True, nullable=False)
    manufacturer = db.Column(db.String)
    length = db.Column(db.String)
    passengers = db.Column(db.String)
    image_url = db.Column(db.String)

    def __repr__(self):
        return f'<Vehicle {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "group_id": self.group_id,
            "name": self.name,
            "manufacturer": self.manufacturer,
            "length": self.length,
            "passengers": self.passengers,
            "image_url": self.image_url
        }


class Favorites(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer)
    group_id = db.Column(db.Integer)
    card_id = db.Column(db.Integer)
    # is_favorite = db.Column(db.Boolean)

    def __repr__(self):
        return f'<Favorites {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "group_id": self.group_id,
            "card_id": self.card_id,
            # "is_favorite": self.is_favorite
        }
