import { Buffer } from 'buffer';
import zlib from 'zlib';
import { promisify } from 'util';

const brotliCompress = promisify(zlib.brotliCompress);
const brotliDecompress = promisify(zlib.brotliDecompress);

export default {
	async fetch(request, env, ctx) {
		try {
			const originalData = 'This is compressed then decompressed';

			// Compress the data using Brotli
			const compressedData = await brotliCompress(Buffer.from(originalData));
			console.log('Compressed data:', compressedData);

			// Decompress the data using Brotli
			const decompressedData = await brotliDecompress(compressedData);
			console.log('Decompressed data:', decompressedData.toString());

			return new Response(decompressedData.toString());
		} catch (err) {
			console.error('Error during compression/decompression:', err);
			return new Response('Error occurred', { status: 500 });
		}
	},
};
