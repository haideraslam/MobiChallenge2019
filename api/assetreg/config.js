
module.exports = {
	name: 'OTOZ Asset Registry API',
	env: process.env.NODE_ENV || 'development',
	port: process.env.PORT || 3010,
	base_url: process.env.BASE_URL || 'http://localhost:3010',
	
	fabric: {
		channel: 'mychannel',
		peerendpoint: process.env.PEER_ADDRESS, //'grpc://localhost:7051',
		ordererendpoint: process.env.ORDERER_ADDRESS, //'grpc://localhost:7050',
		// peerendpoint: 'grpc://host.docker.internal:7051',
		// ordererendpoint: 'grpc://host.docker.internal:7050',
	},

	keymanagement:{
		keystore: 'hfc-key-store'
	}
};