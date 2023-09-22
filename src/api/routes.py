"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, People, Planet, Vehicle, User, Favorites
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token, JWTManager, jwt_required, get_jwt_identity
import json

api = Blueprint('api', __name__)


# GET ALL USERS

@api.route('/users', methods=['GET'])
def get_all_users():
    users = User.query.all()
    user_list = [user.serialize() for user in users]
    return jsonify(user_list), 200


# GET USER BY ID

@api.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = User.query.get(user_id)
    if user is None:
        return jsonify({"message": "User not found"}), 404
    return jsonify({'id': user.id, 'username': user.username, 'email': user.email})


# CREATE USER

@api.route('/user', methods=['POST'])
def create_user():
    email = request.json.get('email')
    username = request.json.get('username')
    password = request.json.get('password')

    if not (email and password):
        return jsonify({"message": "Usuario no creado", "created": False}), 400

    # Verificar si el correo electrónico ya existe en la base de datos
    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({"message": "El correo electrónico ya está en uso", "created": False}), 409

    user = User(email=email, username=username,
                password=password, is_active=True)
    db.session.add(user)
    db.session.commit()

    return jsonify({"message": "Usuario creado", "created": True}), 200


# LOGIN USER

@api.route('/login', methods=['POST'])
def login():
    email = request.json.get('email')
    password = request.json.get('password')

    if email and password is None:
        return jsonify({"msg": "Email y password requeridos"}), 400

    user = User.query.filter_by(email=email, password=password).first()
    if user is None:
        return jsonify({"message": "El usuario no existe"}), 400

    access_token = create_access_token(identity=user.id)
    return jsonify({"token": access_token, "user_id": user.id}), 200


# ALL CHARACTER STAR WARS

@api.route('/people', methods=['GET'])
def handle_all_people():

    all_people = People.query.all()
    people_serialized = [people_name.serialize() for people_name in all_people]
    return jsonify(people_serialized), 200


# CHARACTER STAR WARS BY ID

@api.route('/people/<int:id>', methods=['GET'])
def get_people(id):
    people = People.query.get(id)
    if people is None:
        return jsonify({"message": "People not found"}), 404
    return jsonify({'id': people.id, 'name': people.name, 'gender': people.gender, 'haircolor': people.haircolor, 'eyecolor': people.eyecolor, 'image_url': people.image_url})


# DELETE CHARACTER STAR WARS BY ID

@api.route('/people/<int:id>', methods=['DELETE'])
def delete_people(id):

    people = People.query.get_or_404(id)
    db.session.delete(people)
    db.session.commit()
    return jsonify({'Person Was Deleted'}), 404


# ALL PLANETS STAR WARS

@api.route('/planet', methods=['GET'])
def handle_all_planet():

    all_planets = Planet.query.all()
    planet_serialized = [planet_name.serialize()
                         for planet_name in all_planets]
    return jsonify(planet_serialized), 200


# PLANET STAR WARS BY ID

@api.route('/planet/<int:id>', methods=['GET'])
def get_planet(id):
    planet = Planet.query.get(id)
    if planet is None:
        return jsonify({"message": "Planet not found"}), 404
    return jsonify({'id': planet.id, 'name': planet.name, 'climate': planet.climate, 'gravity': planet.gravity, 'image_url': planet.image_url})


# ADD PLANET
@api.route('/planet', methods=['POST'])
def add_planet():

    body = request.get_json()
    planet_list = Planet(
        name=body['name'], climate=body['climate'], gravity=body['gravity'])
    db.session.add(planet_list)
    db.session.commit()
    return 'Planet Was Created', 200


# DELETE PLANET STAR WARS BY ID

@api.route('/planet/<int:id>', methods=['DELETE'])
def delete_planet(id):

    planet = Planet.query.get_or_404(id)
    db.session.delete(planet)
    db.session.commit()
    return jsonify({'Planet Was Deleted'}), 404


# ALL VEHICLES STAR WARS

@api.route('/vehicle', methods=['GET'])
def handle_all_vehicle():

    all_vehicles = Vehicle.query.all()
    vehicle_serialized = [vehicle_name.serialize()
                          for vehicle_name in all_vehicles]
    return jsonify(vehicle_serialized), 200


# VEHICLE STAR WARS BY ID

@api.route('/vehicle/<int:id>', methods=['GET'])
def get_vehicle(id):
    vehicle = Vehicle.query.get(id)
    if vehicle is None:
        return jsonify({"message": "Vehicle not found"}), 404
    return jsonify({'id': vehicle.id, 'name': vehicle.name, 'manufacturer': vehicle.manufacturer, 'length': vehicle.length, 'passengers': vehicle.passengers, 'image_url': vehicle.image_url})


# ADD VEHICLE

@api.route('/vehicle', methods=['POST'])
def add_vehicle():

    body = request.get_json()
    vehicle_list = Vehicle(
        name=body.name, manufacturer=body['manufacturer'], length=body['length'], passengers=body['passengers'])
    db.session.add(vehicle_list)
    db.session.commit()
    return 'Vehicle Was Created', 200


# DELETE VEHICLE STAR WARS BY ID

@api.route('/vehicle/<int:id>', methods=['DELETE'])
def delete_vehicle(id):

    vehicle = Vehicle.query.get_or_404(id)
    db.session.delete(vehicle)
    db.session.commit()
    return jsonify({'Vehicle Was Deleted'}), 404


# HANDLE FAVORITES

@api.route('/favorites/<int:user_id>', methods=['GET'])
def get_user_favorites(user_id):

    favorites = Favorites.query.filter_by(user_id=user_id).all()
    serialized_favorites = [favorite.serialize() for favorite in favorites]
    return jsonify(favorites=serialized_favorites), 200

# Agregar un elemento a la lista de favoritos del usuario


@api.route('/favorites/<int:user_id>', methods=['POST'])
def add_to_favorites(user_id):
    try:
        # Obtén el ID del elemento que el usuario quiere agregar a favoritos desde los datos de la solicitud
        data = request.json
        # Asegúrate de enviar este campo desde tu front-end
        element_id = data.get('element_id')

        # Verifica si el elemento ya está en la lista de favoritos del usuario
        existing_favorite = Favorites.query.filter_by(
            user_id=user_id, element_id=element_id).first()

        if existing_favorite:
            # Si ya está en favoritos, quítalo
            db.session.delete(existing_favorite)
            db.session.commit()
            return jsonify({"message": "Elemento eliminado de favoritos"}), 200
        else:
            # Si no está en favoritos, agrégalo
            new_favorite = Favorites(user_id=user_id, element_id=element_id)
            db.session.add(new_favorite)
            db.session.commit()
            return jsonify({"message": "Elemento agregado a favoritos"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    api.run()
