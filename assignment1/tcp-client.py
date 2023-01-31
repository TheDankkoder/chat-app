import socket
import sys

# Parse command line arguments 
host = sys.argv[1]
port = int(sys.argv[2])

# Connect to server
client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
client.connect((host, port))

# Send commands to server:

commands = sys.argv[3:]
print(commands)
commands = " ".join(commands)
print(commands)
client.send(commands.encode())
response = client.recv(1024).decode()
while response:
    print(response)
    response = client.recv(1024).decode()
    
client.shutdown(socket.SHUT_RDWR)
client.close()
