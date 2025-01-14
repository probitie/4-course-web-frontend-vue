const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
	transpileDependencies: true,
	devServer: {
	    proxy: {
              '/api': {
		target: 'http://localhost:8080', // Backend server
		changeOrigin: true,
	      },
              '/graphql': {
		target: 'http://localhost:8080', // Backend server
		changeOrigin: true,
	      },
              '/grpc': {
		target: 'http://localhost:9090', // Backend server
		changeOrigin: true,
	      },


	    },
	  },
})


