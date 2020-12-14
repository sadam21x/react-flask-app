from sqlite3.dbapi2 import connect
from flask import Flask, jsonify, make_response, request, abort, url_for
from pymongo import MongoClient
import json
import urllib
import sqlite3

# connection to MongoDB Database
# connection_url = 'mongodb://localhost:27017'
connection_url = 'mongodb://admin:bulldog99@cloud-computing-shard-00-00.i77a5.mongodb.net:27017,cloud-computing-shard-00-01.i77a5.mongodb.net:27017,cloud-computing-shard-00-02.i77a5.mongodb.net:27017/test?ssl=true&replicaSet=atlas-11dc32-shard-0&authSource=admin&retryWrites=true&w=majority'
connection = MongoClient(connection_url)

def home_index():
    api_list=[]
    db = connection.cloud_native.apirelease

    for row in db.find():
        api_list.append(str(row))

    return jsonify({'api_version': api_list}), 200

def list_users():
    api_list=[]
    db = connection.cloud_native.users

    for row in db.find():
        api_list.append(str(row))

    return jsonify({'user_list': api_list})

def list_user(user_id):
    api_list=[]
    db = connection.cloud_native.users

    for i in db.find({'id':user_id}):
        api_list.append(str(i))

    if api_list == []:
        abort(404)

    return jsonify({'user_details':api_list})

def add_user(new_user):
    api_list=[]
    db = connection.cloud_native.users
    user = db.find({'$or':[{"username":new_user['username']} ,{"email":new_user['email']}]})
    
    for i in user:
        print (str(i))
        api_list.append(str(i))

    if api_list == []:
       db.insert(new_user)
       return "Success"
    else :
       abort(409)

    return jsonify(a_dict)

def del_user(del_user):
    db = connection.cloud_native.users
    api_list = []

    for i in db.find({'username':del_user}):
        api_list.append(str(i))

    if api_list == []:
        abort(404)
    else:
        db.remove({"username":del_user})
        return "Success"

def upd_user(user):
    api_list = []
    db_user = connection.cloud_native.users
    users = db_user.find_one({"id":user['id']})

    for i in users:
        api_list.append(str(i))

    if api_list == []:
        abort(409)
    else:
        db_user.update({'id':user['id']},{'$set': user}, upsert=False)
        return "Success"