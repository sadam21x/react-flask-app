from flask import Flask, jsonify, make_response, request, abort, url_for, render_template, redirect, session
from time import gmtime, strftime
from flask_cors import CORS, cross_origin
from pymongo import MongoClient
from requests import Request
import flask
import json
import random
import bcrypt
import secrets
from api.api_v1 import home_index, list_users, list_user, add_user, del_user, upd_user
from api.api_v2 import list_tweets, list_tweet, add_tweet

# connection to MongoDB Database
connection_url = 'mongodb://localhost:27017'
connection = MongoClient(connection_url)

app = Flask(__name__, template_folder='public', static_folder='public/static')
# cookie = flask.request.cookies.get('my_cookie')
app.config.from_object(__name__)
# app.secret_key = secrets.token_urlsafe(16)
app.secret_key = "aezakmi"
CORS(app)

# Initialize Database
def create_mongodatabase():
    try:
        dbnames = connection.database_names()
        if 'cloud_native' not in dbnames:
            db = connection.cloud_native.users
            db_tweets = connection.cloud_native.tweets
            db_api = connection.cloud_native.apirelease

            db.insert({
            "email": "eric.strom@google.com",
            "id": 33,
            "name": "Eric stromberg",
            "password": "eric@123",
            "username": "eric.strom"
            })

            db_tweets.insert({
            "body": "New blog post,Launch your app with the AWS Startup Kit! #AWS",
            "id": 18,
            "timestamp": "2017-03-11T06:39:40Z",
            "tweetedby": "eric.strom"
            })

            db_api.insert( {
              "buildtime": "2017-01-01 10:00:00",
              "links": "/api/v1/users",
              "methods": "get, post, put, delete",
              "version": "v1"
            })
            db_api.insert( {
              "buildtime": "2017-02-11 10:00:00",
              "links": "api/v2/tweets",
              "methods": "get, post",
              "version": "2017-01-10 10:00:00"
            })
            print ("Database Initialize completed!")
        else:
            print ("Database already Initialized!")
    except:
        print ("Database creation failed!!")


@app.route("/")
def root():
    if not session.get('logged_in'):
        return render_template('login.html')
    else:
        return render_template('index.html')

@app.route('/login', methods=['POST'])
def do_admin_login():
	users = connection.cloud_native.users
	api_list=[]
	login_user = users.find({'username': request.form['username']})
	for i in login_user:
		api_list.append(i)
	print (api_list)
	if api_list != []:
		# if api_list[0]['password'].decode('utf-8') == bcrypt.hashpw(request.form['password'].encode('utf-8'), api_list[0]['password']).decode('utf-8'):
		if api_list[0]['password'] == request.form['password']:
			session['username'] = api_list[0]['username']
			session['logged_in'] = True
			return redirect(url_for('root'))
		return 'Invalid username/password!'
	else:
		flash("Invalid Authentication")
		return 'Invalid User!'

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method=='POST':
        users = connection.cloud_native.users
        api_list=[]
        existing_user = users.find({'$or':[{"username":request.form['username']} ,{"email":request.form['email']}]})
        for i in existing_user:
            # print (str(i))
            api_list.append(str(i))

        # print (api_list)
        if api_list == []:
            users.insert({
            "email": request.form['email'],
            "id": random.randint(1,1000),
            "name": request.form['name'],
            # "password": bcrypt.hashpw(request.form['pass'].encode('utf-8'), bcrypt.gensalt()),
            "password": request.form['pass'],
            "username": request.form['username']
            })
            session['username'] = request.form['username']
            return redirect(url_for('home'))

        return 'That user already exists'
    else :
        return render_template('signup.html')

@app.route("/logout")
def logout():
    session['logged_in'] = False
    return redirect(url_for('root'))

@app.route("/getcredentials", methods=['GET'])
def getcredentials():
    return jsonify({'username': session['username']}), 200

@app.route('/profile', methods=['GET', 'POST'])
def profile():
    if request.method=='POST':
        users = connection.cloud_native.users
        api_list=[]
        existing_users = users.find({"username":session['username']})
        for i in existing_users:
            api_list.append(str(i))
        user = {}
        print (api_list)
        if api_list != []:
            user['email']=request.form['email']
            user['name']= request.form['name']
            user['password']=request.form['pass']
            users.update({'username':session['username']},{'$set': user} )
        else:
            return 'User not found!'
        return redirect(url_for('index'))
    if request.method=='GET':
        users = connection.cloud_native.users
        user=[]
        existing_user = users.find({"username":session['username']})
        for i in existing_user:
            user.append(i)
        return render_template('profile.html', name=user[0]['name'], username=user[0]['username'], password=user[0]['password'], email=user[0]['email'])


@app.route("/home")
def home():
    return render_template('home.html')

@app.route("/index")
def index():
    return render_template('index.html')

@app.route('/addname')
def addname():
    if request.args.get('yourname'):
        session['name'] = request.args.get('yourname')
        # And then redirect the user to the main page
        return redirect(url_for('home'))
    else:
        return render_template('home.html', session=session)

@app.route('/clear')
def clearsession():
    session.clear()
    return redirect(url_for('home'))

# @app.route('/set_cookie')
# def cookie_insertion():
#     redirect_to_main = redirect('/')
#     response = current_app.make_response(redirect_to_main )
#     response.set_cookie('cookie_name',value='values')
#     return response

@app.route("/api/v1/info")
def api_v1_info():
    return home_index()

@app.route('/api/v1/users', methods=['GET'])
def get_users():
    return list_users()

@app.route('/api/v1/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    return list_user(user_id)

@app.route('/api/v1/users', methods=['POST'])
def create_user():
    if not request.json or not 'username' in request.json or not 'email' in request.json or not 'password' in request.json:
        abort(400)
    
    user = {
        'name': request.json.get('name',""),
        'username': request.json['username'],
        'email': request.json['email'],
        'password': request.json['password'],
        'id': random.randint(1,1000)
    }

    return jsonify({'status': add_user(user)}), 201

@app.route('/api/v1/users', methods=['DELETE'])
def delete_user():
    if not request.json or not 'username' in request.json:
        abort(400)
    
    user=request.json['username']
    return jsonify({'status': del_user(user)}), 200

@app.route('/api/v1/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    user = {}
    if not request.json:
        abort(400)

    user['id']=user_id
    key_list = request.json.keys()
    
    for i in key_list:
        user[i] = request.json[i]

    return jsonify({'status': upd_user(user)}), 200

@app.route('/api/v2/tweets', methods=['GET'])
def get_tweets():
    return list_tweets()

@app.route('/api/v2/tweets/<int:id>', methods=['GET'])
def get_tweet(id):
    return list_tweet(id)

@app.route('/api/v2/tweets', methods=['POST'])
def add_tweets():
    user_tweet = {}
    if not request.json or not 'body' in request.json:
        abort(400)
    
    user_tweet['tweetedby'] = session['username']
    user_tweet['body'] = request.json['body']
    user_tweet['timestamp']=strftime("%Y-%m-%dT%H:%M:%SZ", gmtime())
    user_tweet['id'] = random.randint(1,1000)

    return jsonify({'status': add_tweet(user_tweet)}), 200

@app.route('/adduser')
def adduser():
    return render_template('adduser.html')

@app.route('/addtweets')
def addtweetjs():
    return render_template('addtweets.html')


@app.errorhandler(404)
def resource_not_found(error):
    return make_response(jsonify({'error': 'Resource not found!'}), 404)

@app.errorhandler(409)
def user_found(error):
    return make_response(jsonify({'error': 'Conflict! Record exist'}), 409)

@app.errorhandler(400)
def invalid_request(error):
    return make_response(jsonify({'error': 'Bad Request'}), 400)

if __name__ == '__main__':
    create_mongodatabase()
    app.run(host='0.0.0.0', port=5000, debug=True)