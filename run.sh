
# Navigate to the client directory and run npm start
cd client
echo "Starting client..."
npm start &

# Navigate to the server directory and run npm start
cd ../server
echo "Starting server..."
npm start &

# Wait for both processes to finish
wait