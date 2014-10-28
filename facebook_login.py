#-*- coding: utf-8 -*-
from flask import Flask, redirect, url_for, session, request, render_template
from flask_oauth import OAuth
from database import *
from models import *
from base64 import *
import os
import random
import sys

reload(sys)
sys.setdefaultencoding('utf8')

SECRET_KEY = 'development key'
DEBUG = True
FACEBOOK_APP_ID = '700549056695412'
FACEBOOK_APP_SECRET = '54a670ce9f9b7b5f69152b6e1dc665b1'
UPLOAD_FOLDER = '/Users/smswnd/mathician/uploads/'
app = Flask(__name__, static_folder="", static_url_path="")
app.debug = DEBUG
app.secret_key = SECRET_KEY
oauth = OAuth()
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

facebook = oauth.remote_app('facebook',
    base_url='https://graph.facebook.com/',
    request_token_url=None,
    access_token_url='/oauth/access_token',
    authorize_url='https://www.facebook.com/dialog/oauth',
    consumer_key=FACEBOOK_APP_ID,
    consumer_secret=FACEBOOK_APP_SECRET,
    request_token_params={'scope': ('email, publish_actions')}
)

def isloggedin():
    if len(session)>=2:
        return True
    return False

@app.route('/')
def index():
    return render_template('index.html');

@app.route('/login')
def login():
    return facebook.authorize(callback=url_for('facebook_authorized',
        next=request.args.get('next') or request.referrer or None,
        _external=True))


@app.route('/login/authorized')
@facebook.authorized_handler
def facebook_authorized(resp):
    if resp is None:
        return 'Access denied: reason=%s error=%s' % (
            request.args['error_reason'],
            request.args['error_description']
        )
    session['oauth_token'] = (resp['access_token'], '')
    me = facebook.get('/me')
    id=me.data['id']
    session['fid'] = id
    session['name'] = me.data['name']
    qq=db_session.query(User.fid).filter_by(fid=id).all()
    if len(qq)==0:
        user = User(fid=id, name=me.data['name'])
        db_session.add(user)
        db_session.commit()
    return redirect(url_for('main'))

@app.route('/logout')
def logout():
    if isloggedin():
        session.clear()
        return "successfully logout..."
    else:
        return redirect('/')

@app.route('/main')
def main():
    if isloggedin():
        return render_template('main.html',name = session['name']);
    else:
        return redirect('/')

@app.route('/qsave', methods=['GET', 'POST'])
def qsave():
    if isloggedin():
        if request.method == 'POST':
            title = request.form['title'].encode('utf-8')
            image = request.form['context']
            image = b64decode(image.split(",")[-1])
            username = session['name'].encode('utf-8')
            num = str(random.randint(1,100000000000000)).encode('utf-8')
            filename = b64encode(title+username+num)
            f = open(UPLOAD_FOLDER+filename+'.png','a')
            f.write(image)
            f.close()
            qqq = Ques(fid=session['fid'], inum=num, title=title)
            db_session.add(qqq)
            db_session.commit()
            return redirect('/uploads/'+filename+'.png')
    else:
        return redirect('/')


@facebook.tokengetter
def get_facebook_oauth_token():
    return session.get('oauth_token')

@app.route('/database.py')
@app.route('/db.py')
@app.route('/facebook_login.py')
@app.route('/models.py')
def not_allowed():
    return redirect("/404");

if __name__ == '__main__':
    app.run('0.0.0.0',debug=True)

