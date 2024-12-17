/**
 * @fileoverview gRPC-Web generated client stub for net.devh.boot.grpc.example
 * @enhanceable
 * @public
 */

// Code generated by protoc-gen-grpc-web. DO NOT EDIT.
// versions:
// 	protoc-gen-grpc-web v1.5.0
// 	protoc              v3.21.12
// source: TaskService.proto


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.net = {};
proto.net.devh = {};
proto.net.devh.boot = {};
proto.net.devh.boot.grpc = {};
proto.net.devh.boot.grpc.example = require('./TaskService_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.net.devh.boot.grpc.example.TaskServiceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname.replace(/\/+$/, '');

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.net.devh.boot.grpc.example.TaskServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname.replace(/\/+$/, '');

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.net.devh.boot.grpc.example.GetTaskRequest,
 *   !proto.net.devh.boot.grpc.example.TaskResponse>}
 */
const methodDescriptor_TaskService_GetTask = new grpc.web.MethodDescriptor(
  '/net.devh.boot.grpc.example.TaskService/GetTask',
  grpc.web.MethodType.UNARY,
  proto.net.devh.boot.grpc.example.GetTaskRequest,
  proto.net.devh.boot.grpc.example.TaskResponse,
  /**
   * @param {!proto.net.devh.boot.grpc.example.GetTaskRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.net.devh.boot.grpc.example.TaskResponse.deserializeBinary
);


/**
 * @param {!proto.net.devh.boot.grpc.example.GetTaskRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.net.devh.boot.grpc.example.TaskResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.net.devh.boot.grpc.example.TaskResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.net.devh.boot.grpc.example.TaskServiceClient.prototype.getTask =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/net.devh.boot.grpc.example.TaskService/GetTask',
      request,
      metadata || {},
      methodDescriptor_TaskService_GetTask,
      callback);
};


/**
 * @param {!proto.net.devh.boot.grpc.example.GetTaskRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.net.devh.boot.grpc.example.TaskResponse>}
 *     Promise that resolves to the response
 */
proto.net.devh.boot.grpc.example.TaskServicePromiseClient.prototype.getTask =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/net.devh.boot.grpc.example.TaskService/GetTask',
      request,
      metadata || {},
      methodDescriptor_TaskService_GetTask);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.net.devh.boot.grpc.example.AddTaskRequest,
 *   !proto.net.devh.boot.grpc.example.TaskResponse>}
 */
const methodDescriptor_TaskService_AddTask = new grpc.web.MethodDescriptor(
  '/net.devh.boot.grpc.example.TaskService/AddTask',
  grpc.web.MethodType.UNARY,
  proto.net.devh.boot.grpc.example.AddTaskRequest,
  proto.net.devh.boot.grpc.example.TaskResponse,
  /**
   * @param {!proto.net.devh.boot.grpc.example.AddTaskRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.net.devh.boot.grpc.example.TaskResponse.deserializeBinary
);


/**
 * @param {!proto.net.devh.boot.grpc.example.AddTaskRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.net.devh.boot.grpc.example.TaskResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.net.devh.boot.grpc.example.TaskResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.net.devh.boot.grpc.example.TaskServiceClient.prototype.addTask =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/net.devh.boot.grpc.example.TaskService/AddTask',
      request,
      metadata || {},
      methodDescriptor_TaskService_AddTask,
      callback);
};


/**
 * @param {!proto.net.devh.boot.grpc.example.AddTaskRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.net.devh.boot.grpc.example.TaskResponse>}
 *     Promise that resolves to the response
 */
proto.net.devh.boot.grpc.example.TaskServicePromiseClient.prototype.addTask =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/net.devh.boot.grpc.example.TaskService/AddTask',
      request,
      metadata || {},
      methodDescriptor_TaskService_AddTask);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.net.devh.boot.grpc.example.UpdateTaskRequest,
 *   !proto.net.devh.boot.grpc.example.TaskResponse>}
 */
const methodDescriptor_TaskService_UpdateTask = new grpc.web.MethodDescriptor(
  '/net.devh.boot.grpc.example.TaskService/UpdateTask',
  grpc.web.MethodType.UNARY,
  proto.net.devh.boot.grpc.example.UpdateTaskRequest,
  proto.net.devh.boot.grpc.example.TaskResponse,
  /**
   * @param {!proto.net.devh.boot.grpc.example.UpdateTaskRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.net.devh.boot.grpc.example.TaskResponse.deserializeBinary
);


/**
 * @param {!proto.net.devh.boot.grpc.example.UpdateTaskRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.net.devh.boot.grpc.example.TaskResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.net.devh.boot.grpc.example.TaskResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.net.devh.boot.grpc.example.TaskServiceClient.prototype.updateTask =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/net.devh.boot.grpc.example.TaskService/UpdateTask',
      request,
      metadata || {},
      methodDescriptor_TaskService_UpdateTask,
      callback);
};


/**
 * @param {!proto.net.devh.boot.grpc.example.UpdateTaskRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.net.devh.boot.grpc.example.TaskResponse>}
 *     Promise that resolves to the response
 */
proto.net.devh.boot.grpc.example.TaskServicePromiseClient.prototype.updateTask =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/net.devh.boot.grpc.example.TaskService/UpdateTask',
      request,
      metadata || {},
      methodDescriptor_TaskService_UpdateTask);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.net.devh.boot.grpc.example.DeleteTaskRequest,
 *   !proto.net.devh.boot.grpc.example.BooleanResponse>}
 */
const methodDescriptor_TaskService_DeleteTask = new grpc.web.MethodDescriptor(
  '/net.devh.boot.grpc.example.TaskService/DeleteTask',
  grpc.web.MethodType.UNARY,
  proto.net.devh.boot.grpc.example.DeleteTaskRequest,
  proto.net.devh.boot.grpc.example.BooleanResponse,
  /**
   * @param {!proto.net.devh.boot.grpc.example.DeleteTaskRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.net.devh.boot.grpc.example.BooleanResponse.deserializeBinary
);


/**
 * @param {!proto.net.devh.boot.grpc.example.DeleteTaskRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.net.devh.boot.grpc.example.BooleanResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.net.devh.boot.grpc.example.BooleanResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.net.devh.boot.grpc.example.TaskServiceClient.prototype.deleteTask =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/net.devh.boot.grpc.example.TaskService/DeleteTask',
      request,
      metadata || {},
      methodDescriptor_TaskService_DeleteTask,
      callback);
};


/**
 * @param {!proto.net.devh.boot.grpc.example.DeleteTaskRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.net.devh.boot.grpc.example.BooleanResponse>}
 *     Promise that resolves to the response
 */
proto.net.devh.boot.grpc.example.TaskServicePromiseClient.prototype.deleteTask =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/net.devh.boot.grpc.example.TaskService/DeleteTask',
      request,
      metadata || {},
      methodDescriptor_TaskService_DeleteTask);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.net.devh.boot.grpc.example.GetAllTasksRequest,
 *   !proto.net.devh.boot.grpc.example.GetAllTasksResponse>}
 */
const methodDescriptor_TaskService_GetAllTasks = new grpc.web.MethodDescriptor(
  '/net.devh.boot.grpc.example.TaskService/GetAllTasks',
  grpc.web.MethodType.UNARY,
  proto.net.devh.boot.grpc.example.GetAllTasksRequest,
  proto.net.devh.boot.grpc.example.GetAllTasksResponse,
  /**
   * @param {!proto.net.devh.boot.grpc.example.GetAllTasksRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.net.devh.boot.grpc.example.GetAllTasksResponse.deserializeBinary
);


/**
 * @param {!proto.net.devh.boot.grpc.example.GetAllTasksRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.net.devh.boot.grpc.example.GetAllTasksResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.net.devh.boot.grpc.example.GetAllTasksResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.net.devh.boot.grpc.example.TaskServiceClient.prototype.getAllTasks =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/net.devh.boot.grpc.example.TaskService/GetAllTasks',
      request,
      metadata || {},
      methodDescriptor_TaskService_GetAllTasks,
      callback);
};


/**
 * @param {!proto.net.devh.boot.grpc.example.GetAllTasksRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.net.devh.boot.grpc.example.GetAllTasksResponse>}
 *     Promise that resolves to the response
 */
proto.net.devh.boot.grpc.example.TaskServicePromiseClient.prototype.getAllTasks =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/net.devh.boot.grpc.example.TaskService/GetAllTasks',
      request,
      metadata || {},
      methodDescriptor_TaskService_GetAllTasks);
};


module.exports = proto.net.devh.boot.grpc.example;
