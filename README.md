# smartphone-store


## Project setup
```
install node-js and npm
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

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
