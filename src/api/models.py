from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "is_active": self.is_active,
            # do not serialize the password, its a security breach
        }


class People(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)
    gender = db.Column(db.String(30), unique=False, nullable=False)
    haircolor = db.Column(db.String)
    eyecolor = db.Column(db.String)

    def __repr__(self):
        return f'<People {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "gender": self.gender,
            "haircolor": self.haircolor,
            "eyecolor": self.eyecolor
        }


class Planet(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)
    gravity = db.Column(db.String)
    climate = db.Column(db.String)

    def __repr__(self):
        return f'<Planet {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "gravity": self.gravity,
            "climate": self.climate
        }


class Vehicle(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)
    manufacturer = db.Column(db.String)
    length = db.Column(db.String)
    passengers = db.Column(db.String)

    def __repr__(self):
        return f'<Vehicle {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "manufacturer": self.manufacturer,
            "length": self.length,
            "passengers": self.passengers
        }


# class Favorites(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
#     planet_id = db.Column(db.Integer, db.ForeignKey('planet.id'))
#     character_id = db.Column(db.Integer, db.ForeignKey('character.id'))
#     vehicle_id = db.Column(db.Integer, db.ForeignKey('vehicle.id'))

#     def __repr__(self):
#         return f'<Favorites {self.name}'

#     def serialize(self):
#         return {
#             "id": self.id,
#             "user_id": self.user_id,
#             "character_id": self.character_id,
#             "planet_id": self.planet_id,
#             "vehicle_id": self.vehicle_id
#         }
