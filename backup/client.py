import socket
import threading
import pickle
import sys
from cmd import Cmd
serverAddr = ("127.0.0.1", 8020)

if __name__=='__main__':

    inp = input("Enter true address: ")
    host = inp
    port = 8001

    query = sys.argv[1:]
    print(query) #returns a list

    sockTcp = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sockTcp.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    sockTcp.bind((host,port))
    sockTcp.connect(serverAddr)

    query = " ".join(query)
    print(query)        #returns a list

    sockTcp.send(query.encode('utf-8'))
    sockTcp.shutdown(socket.SHUT_RDWR)
    sockTcp.close()



