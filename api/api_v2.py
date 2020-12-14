from flask import Flask, jsonify, make_response, request, abort, url_for
from pymongo import MongoClient
import json
import urllib
import sqlite3

# connection to MongoDB Database
# connection_url = 'mongodb://localhost:27017'
connection_url = 'mongodb://admin:bulldog99@cloud-computing-shard-00-00.i77a5.mongodb.net:27017,cloud-computing-shard-00-01.i77a5.mongodb.net:27017,cloud-computing-shard-00-02.i77a5.mongodb.net:27017/test?ssl=true&replicaSet=atlas-11dc32-shard-0&authSource=admin&retryWrites=true&w=majority'
connection = MongoClient(connection_url)

def list_tweets():
    api_list = []
    db = connection.cloud_native.tweets

    for row in db.find():
        api_list.append(str(row))

    return jsonify({'tweets_list': api_list})

def list_tweet(user_id):
    db = connection.cloud_native.tweets
    api_list = []
    tweet = db.find({'id':user_id})

    for i in tweet:
        api_list.append(str(i))

    if api_list == []:
        abort(404)
    
    return jsonify({'tweet':api_list})

def add_tweet(new_tweet):
    api_list = []
    db_user = connection.cloud_native.users
    db_tweet = connection.cloud_native.tweets
    user = db_user.find({"username":new_tweet['tweetedby']})

    for i in user:
        api_list.append(str(i))

    if api_list == []:
        abort(404)
    else:
        db_tweet.insert(new_tweet)
        return "Success"
