```
export access_token=$(\
curl -X POST https://mykeycloak.masales.lab:8543/realms/myrealm/protocol/openid-connect/token \
--user mybackend:'7ZgVes5oVJD419Xb0wXlkysSzi8oGGLD' \
-H 'content-type: application/x-www-form-urlencoded' \
-d 'username=alice&password=alice&grant_type=password' | jq --raw-output '.access_token' \
)
```

```
curl -X GET \
http://localhost:8080 \
-H "Authorization: Bearer "$access_token
```