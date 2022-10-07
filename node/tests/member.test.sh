#!/bin/bash
curl -d "" http://localhost:3000/api/members/create                                                                                         #fail email

curl -d "email=test" http://localhost:3000/api/members/create                                                                               #fail email
curl -d "email=test@test.com" http://localhost:3000/api/members/create                                                                      #fail phone

curl -d "email=test@test.com&phone=1" http://localhost:3000/api/members/create                                                              #fail phone
curl -d "email=test@test.com&phone=0400000000" http://localhost:3000/api/members/create                                                     #fail address

curl -d "email=test@test.com&phone=0490407532&addressFirstLine=MY+HOUSE" http://localhost:3000/api/members/create                           #fail address
curl -d "email=test@test.com&phone=0490407532&addressFirstLine=123+Broadway" http://localhost:3000/api/members/create                       #fail postcode

curl -d "email=test@test.com&phone=0490407532&addressFirstLine=123+Broadway&addressPostcode=3" http://localhost:3000/api/members/create     #fail postcode
curl -d "email=test@test.com&phone=0490407532&addressFirstLine=123+Broadway&addressPostcode=3000" http://localhost:3000/api/members/create  #pass!!!