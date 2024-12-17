# START UP

## compile and run backend
```
install intellij-idea Community Edition or any free IDE for java
compile and run the backend before frontend
```

## Frontend setup
```
install node-js and npm
npm install
```

```
npm run serve
```

run gRPC proxy from project root
```
envoy -c envoy.yaml
```


# DEVELOPMENT

## Setup gRPC

```
npm install grpc-web google-protobuf
npm install -g protoc-gen-grpc-web
install protobuf compiler 'protoc'

protoc -I=proto/ product.proto \
  --js_out=import_style=commonjs:./src/grpc/ \
  --grpc-web_out=import_style=commonjs,mode=grpcwebtext:./src/grpc/
```

if you get error about protic-gen-js - add ./node-modules/protoc-gen-js/bin to path or itnstall it globally

protoc compile command
```
protoc -I=proto/ product.proto   --js_out=import_style=commonjs:./src/grpc/   --grpc-web_out=import_style=commonjs,mode=grpcwebtext:./src/grpc/
```

Troubleshooting:
when installing apollo client, it says that it requires react

1) install react
2) import @apollo/client/core instead of @apollo/client (https://github.com/apollographql/apollo-client/issues/7318#issuecomment-734422428)
