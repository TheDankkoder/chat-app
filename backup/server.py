import socket
import threading
import pickle
serverAddr = ("127.0.0.1",8020)

def receiveConnection(query,addr,database,isManager=None):

    if addr not in database.keys():
        database[addr] = dict()
    
    query = query.split(" ")
    i = 0

    queryTuples = list()
    while i<len(query):

        if query[i]=="get":
            queryTuples.append(("get",query[i+1]))
            i+=2
        
        elif query[i]=="put":
            queryTuples.append(("put",query[i+1],query[i+2]))
            i+=3

        else:
            raise Exception

    
    for tup in queryTuples:
        if tup[0]=="get":

            if tup[1] in database[addr].keys():
                print(database[addr][tup[1]])
            
            else:
                print("<blank>")

        elif tup[0]=="put":

            database[addr][tup[1]]=tup[2]

    return

if __name__=='__main__':
    database = dict()
    managers = set()

    sockTcp = socket.socket(socket.AF_INET,socket.SOCK_STREAM)
    sockTcp.bind(serverAddr)

    sockTcp.listen(5)

    while True:
        conn,trueAddr = sockTcp.accept()

        string = conn.recv(1024).decode('utf-8')

        host = string.split(" ")[0]
        port = int(string.split(" ")[1])
        addr = (host,port)

        if addr!=trueAddr and not trueAddr in managers:
            print("Query not authorized")
            choice = input("Give client manager status? Y/N: ")

            if choice=='N':
                continue

            managers.add(trueAddr)



        string = " ".join(string.split(" ")[2:])

        worker = threading.Thread(target = receiveConnection,args=[string,trueAddr,database])
        worker.start()

    
