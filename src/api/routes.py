"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, People, Planet, Vehicle, User
from api.utils import generate_sitemap, APIException

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

@api.route('/register', methods=['POST'])
def create_user():
    request_body = request.get_json()
    new_user = User(username=request_body["username"], email=request_body["email"],
                    password=request_body["password"], is_active=request_body["is_active"])
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User created successfully"}), 200


# @api.route('/users/favorites/<int:user_id>', methods=['GET'])
# def get_user_favorites(user_id):

#     favorites = Favorites.query.filter_by(user_id=user_id).all()
#     serialized_favorites = [favorite.serialize() for favorite in favorites]
#     return jsonify(favorites=serialized_favorites), 200


# ALL CHARACTER STAR WARS

@api.route('/people', methods=['GET'])
def handle_all_people():

    all_people = People.query.all()
    people_serialized = [people_name.serialize() for people_name in all_people]
    return jsonify(people_serialized), 200


# CHARACTER STAR WARS BY ID

@api.route('/people/<int:people_id>', methods=['GET'])
def handle_people(id):

    all_people = People.query.all()
    people_serialized = [people_name.serialize() for people_name in all_people]
    return jsonify(people_serialized), 200


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

@api.route('/planet/<int:planet_id>', methods=['GET'])
def handle_planet(id):

    all_planets = Planet.query.all()
    planet_serialized = [planet_name.serialize()
                         for planet_name in all_planets]
    return jsonify(planet_serialized), 200


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

@api.route('/vehicle/<int:vehicle_id>', methods=['GET'])
def handle_vehicle(id):

    all_vehicles = Vehicle.query.all()
    vehicle_serialized = [vehicle_name.serialize()
                          for vehicle_name in all_vehicles]
    return jsonify(vehicle_serialized), 200


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


if __name__ == '__main__':
    api.run()
