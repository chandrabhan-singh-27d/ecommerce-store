# Navigate to the client directory and run npm install
cd client
echo "Installing client dependencies..."
npm install

# Navigate to the server directory and run npm install
cd ../server
echo "Installing server dependencies..."
npm install

# Navigate back to the main directory and change aceess modification right to execute
cd ..
chmod +x run.sh

# Execute the run.sh script
echo "Starting the application..."
./run.sh