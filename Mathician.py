#-*- coding: utf-8 -*-
from flask import Flask, redirect, url_for, session, request, render_template
from flask_oauth import OAuth
from database import *
from models import *
from base64 import *
from sqlalchemy.sql import text
import os
import random
import uuid
import sys

reload(sys)
sys.setdefaultencoding('utf8')
SECRET_KEY = 'development key'
DEBUG = True
FACEBOOK_APP_ID = '1569951343226675'
FACEBOOK_APP_SECRET = 'c1e62aa47e49634b2804d7663794e8d1'
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

def randomurl(leng):
    return str(uuid.uuid4()).upper().replace("-","")[0:leng]

@app.route('/')
def index():
    return render_template('index.html', login= isloggedin());

@app.route('/<inum>')
def view_n(inum):
    if isloggedin():
        ques = db_session.query(Ques.title, Ques.filename, Ques.fid, Ques.no, Ques.inum).filter_by(inum=inum).all()
        alist = db_session.query(Ans.title, Ans.filename, Ans.fid, Ans.no, Ans.qno).filter_by(qno=ques[0].no).all()
        return render_template('view.html', ques = ques, alist = alist, ismine=(session['fid']==ques[0].fid));
    else:
        return redirect('/')

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
    return redirect('/')

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
	list = db_session.execute(text('select ques.title, ques.filename, ques.inum, ques.fid, (select count(*) from ans where ans.qno = ques.no) as cnt from ques')).fetchall()
        return render_template('main.html', list = list);
    else:
        return redirect('/')


@app.route('/view', methods=['GET'])
def view():
    if isloggedin():
        if request.method == 'GET':
            if 'id' in request.args:
                qnum = request.args['id']

                ques = db_session.query(Ques.title, Ques.filename, Ques.fid, Ques.no).filter_by(no=qnum).all()
                alist = db_session.query(Ans.title, Ans.filename, Ans.fid, Ans.no, Ans.qno).filter_by(qno=ques[0].no).all()
		return render_template('view.html', ques = ques, alist = alist, ismine=(session['fid']==ques[0].fid));
            else:
                return 'invalid request'
        else:
            return 'invalid request'
    else:
        return redirect('/')

@app.route('/edit', methods=['GET'])
def edit():
    if isloggedin():
        if request.method == 'GET':
            if request.args['mode']=='q':
                return render_template('edit.html', mode="qsave");
            elif request.args['mode']=='a':
                if 'qnum' in request.args:
                    return render_template('edit.html', mode="asave", qnum=request.args['qnum']);
                else:
                    return 'invalid request'
            else:
                return 'invalid request'
        else:
                return 'invalid request'
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
            num = randomurl(7)
            filename = b64encode(title+username+num)
            f = open(UPLOAD_FOLDER+filename+'.png','a')
            f.write(image)
            f.close()
            qqq = Ques(fid=session['fid'], inum=num, title=title, filename=filename)
            db_session.add(qqq)
            db_session.commit()
            return  "<script>window.close()</script>";
    else:
        return redirect('/')

@app.route('/asave', methods=['GET', 'POST'])
def asave():
    if isloggedin():
        if request.method == 'POST':
            title = request.form['title'].encode('utf-8')
            image = request.form['context']
            image = b64decode(image.split(",")[-1])
            username = session['name'].encode('utf-8')
            num = randomurl(7)
            filename = b64encode(title+username+num)
            f = open(UPLOAD_FOLDER+filename+'.png','a')
            f.write(image)
            f.close()
            ques = db_session.query(Ques.no,Ques.inum).filter_by(inum=request.form['qnum']).all()
            qqq = Ans(fid=session['fid'], qno=ques[0].no, inum=num, title=title, filename=filename)
            db_session.add(qqq)
            db_session.commit()
            return "<script>window.close()</script>"
    else:
        return redirect('/')

@app.route('/profile')
def my_profile():
    if isloggedin():
        #ques = db_session.execute(text('select ques.no, ques.fid, (select count(*) from ans where ans.fid = ques.fid) as count from ques')).fetchall()
        #'a'+1
        ques = db_session.execute(text('select ques.title, ques.filename, ques.inum, ques.fid, (select count(*) from ans where ans.qno = ques.no) as count from ques where ques.fid='+session.get('fid'))).fetchall()
        ans = db_session.query(Ans.title, Ans.filename, Ans.fid, Ans.no, Ans.qno).filter_by(fid=session.get('fid')).all()
        return render_template('profile.html', ques=ques, ans=ans,  ismine=1);
        'a'+1
    else:
        return redirect('/')

@app.route('/profile/<fid>')
def show_profile(fid):
    if isloggedin():
        #ques = db_session.execute(text('select ques.no, ques.fid, (select count(*) from ans where ans.fid = ques.fid) as count from ques')).fetchall()
        #'a'+1
        ques = db_session.execute(text('select ques.title, ques.filename, ques.inum, ques.fid, (select count(*) from ans where ans.qno = ques.no) as count from ques where ques.fid='+fid)).fetchall()
        ans = db_session.query(Ans.title, Ans.filename, Ans.fid, Ans.no, Ans.qno).filter_by(fid=fid).all()
        return render_template('profile.html', ques=ques, ans=ans,  ismine=1);
        'a'+1
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
