import socket
import threading

# Dictionary to store key-value pairs for each client
clients = {}
# Dictionary to store client roles
managers = set()

def handle_client(client, address):
    # Initially assign client the "guest" role
        if address not in managers:
            print("Only managers can change data. ")
            choice = input("Authorise client? Y/N :")
            
            if(choice == "N"):
                print(f"[DISCONNECTED] {address} disconnected.")
                del clients[address]
                client.close()

            managers.add(address)
    
        # Receive data from client
        #print(clients)
        data = client.recv(1024).decode()
        
        data = data.split(" ")
        i = 0
        queries = list()
        while i<len(data):

            if data[i] == "get":
                queries.append(("get",data[i+1]))
                i+=2
            elif data[i]=="put":
                queries.append(("put",data[i+1],data[i+2]))
                i+=3

            elif data[i] == "upgrade":
                queries.append(("upgrade",data[i+1],data[i+2]))
                i+=3

            else:
                raise Exception
      
        #print(data)
        print(queries)
        
        for tup in queries:
            if tup[0] == "get":

                if tup[1] in clients[address].keys():
                    print(clients[address][tup[1]])
                    client.send(clients[address][tup[1]].encode())

                else:
                    print("<blank>")

            elif tup[0]=="put":

                clients[address][tup[1]]=tup[2]
                print("Key value pair added")

            elif tup[0] == "upgrade":
                upgraded_addr = (tup[1],int(tup[2]))
                managers.add(upgraded_addr)
                print("Updated address")
                client.send("Client upgraded to manager .".encode())

        
        return


    
def start_server():
    host = "127.0.0.1"
    port = 5555

    server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server.bind((host, port))
    print(f"[LISTENING] Server is listening on {host}:{port}...")
    server.listen()

    while True:
        client, address = server.accept()
        print(f"[CONNECTED] {str(address)} connected.")
        clients[address] = {}
        client.send("Connection established.".encode())
        thread = threading.Thread(target=handle_client, args=(client, address))
        thread.start()

print("[STARTING] Server is starting...")
start_server()









#change client code to include all queries at once. Ask for authorization at the start , for only that client .No need to show other client's key - value change
