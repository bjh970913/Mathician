#-*- coding: utf-8 -*-
from sqlalchemy import Column, Integer, String, Unicode
from database import Base

class User(Base):
	__tablename__ = 'user'
	no = Column(Integer, primary_key=True, autoincrement=True)
	fid = Column(String(20))
	name = Column(Unicode(20), )

	def __init__(self, fid=None, name=None):
		self.fid  = fid
		self.name =name

	def __repr__(self):
		return str(self.fid)

class Ques(Base):
        __tablename__ = 'ques'
        no = Column(Integer, primary_key=True, autoincrement=True)
        fid = Column(String(20))
        inum = Column(String(15))
	title = Column(String(20))

        def __init__(self, fid=None, inum=None, title=None):
                self.fid  = fid
                self.inum = inum
		self.title = title

        def __repr__(self):
                return str(self.fid)


class Ans(Base):
        __tablename__ = 'ans'
        no = Column(Integer, primary_key=True, autoincrement=True)
        fid = Column(String(20))
	qno = Column(Integer)
        inum = Column(Integer)

        def __init__(self, fid=None, qno=None, inum=None):
                self.fid  = fid
                self.qno = qno
		self.inum = inum

        def __repr__(self):
                return str(self.fid)
